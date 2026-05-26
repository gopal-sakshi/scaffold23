const express = require('express');
const app = express();
app.use(express.json());

const k8s = require('@kubernetes/client-node');
const kc = new k8s.KubeConfig();
kc.loadFromCluster();
const k8sApi = kc.makeApiClient(k8s.CoreV1Api);

app.get('/hello', (_req, res) => res.send('HalaMadrid from service24'));
app.get('/getData24', (_req, res) => {
    console.log("req received ");
    res.send({
        time23: new Date().toISOString(),
        players23: [ 'carlsen', 'gukesh', 'caruana' ]
    })
});

app.get('/getClusterPods', async (req, res) => {
    console.log("getClusterPods rcvd ", new Date().toISOString());
    try {
        const namespaces23 = await k8sApi.listNamespacedPod({ namespace: 'default' });
        console.log("namespaces23 ===> ", JSON.stringify(namespaces23, null, 2));
        res.send(namespaces23);
    } catch (err) {
        console.error("K8s API Error:", err);
        res.status(500).send({ error: err.message });
    }
});

app.get('/k8s-services', async (req, res) => {
    try {
        const servicesData = await k8sApi.listNamespacedService({ namespace: 'default' });
        const serviceList = servicesData.items.map(svc => ({
            name: svc.metadata.name,
            type: svc.spec.type,
            clusterIP: svc.spec.clusterIP
        }));

        res.send({ count: serviceList.length, services: serviceList });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

app.get('/k8s-nodes', async (req, res) => {
    try {
        const nodesData = await k8sApi.listNode();        
        const nodeSummary = nodesData.items.map(node => ({
            name: node.metadata.name,
            kubeletVersion: node.status.nodeInfo.kubeletVersion,
            os: node.status.nodeInfo.osImage,
            architecture: node.status.nodeInfo.architecture
        }));

        res.send({ nodes: nodeSummary });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

app.get('/k8s-deployments', async (req, res) => {
    const appsApi = kc.makeApiClient(k8s.AppsV1Api);
    try {
        const deploymentsData = await appsApi.listNamespacedDeployment({ namespace: 'default' });
        
        const deploymentSummary = deploymentsData.items.map(deploy => ({
            name: deploy.metadata.name,
            desiredReplicas: deploy.spec.replicas,
            readyReplicas: deploy.status.readyReplicas || 0,
            updatedReplicas: deploy.status.updatedReplicas || 0
        }));

        res.send({ deployments: deploymentSummary });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

app.get('/k8s-getConfigData', (req, res) => {
    res.send({
        environment: process.env.APP_ENV,
        timeout: process.env.CHESS_API_TIMEOUT,
        maxPlayers: process.env.MAX_PLAYERS_ALLOWED
    });
});

// 1. READ A SPECIFIC CONFIGMAP
app.get('/k8s-configmap/:name', async (req, res) => {
    const configMapName = req.params.name;
    try {
        // Fetches a single configmap by its name string
        const configMap = await k8sApi.readNamespacedConfigMap({
            name: configMapName,
            namespace: 'default'
        });
        
        res.send({
            message: `Successfully read ConfigMap: ${configMapName}`,
            data: configMap.data || {}
        });
    } catch (err) {
        res.status(err.statusCode || 500).send({ error: err.message });
    }
});

// 2. UPDATE / REPLACE CONFIGMAP DATA
app.put('/k8s-configmap/:name/update', async (req, res) => {
    const configMapName = req.params.name;
    try {
        // Step A: Read the existing configmap object structure first
        const existingCm = await k8sApi.readNamespacedConfigMap({
            name: configMapName,
            namespace: 'default'
        });

        // Step B: Overwrite the data map completely
        existingCm.data = {
            ...existingCm.data,
            newConfigMap1: req.body.param1
        };

        // Step C: Send the modified object back to cluster
        const updatedCm = await k8sApi.replaceNamespacedConfigMap({
            name: configMapName,
            namespace: 'default',
            body: existingCm // Pass the full modified object as the body
        });

        res.send({ message: "ConfigMap replaced successfully", updatedData: updatedCm.data });
    } catch (err) {
        res.status(err.statusCode || 500).send({ error: err.message });
    }
});

app.patch('/k8s-configmap/:name/patch', async (req, res) => {
    const configMapName = req.params.name;
    try {
        const patchPayload = [
            {
                "op": "add", // or "replace"
                "path": "/data/patched-key23", 
                "value": "hello-from-service24"
            }
        ];

        const patchedCm = await k8sApi.patchNamespacedConfigMap({
            name: configMapName,
            namespace: 'default',
            body: patchPayload,
            options: {
                headers: { "Content-Type": "application/json-patch+json" }
            }
        });
        const updatedData = patchedCm.data || {};
        res.send({ message: "Key patched successfully", currentData: updatedData });
    } catch (err) {
        res.status(err.statusCode || 500).send({ error: err.message });
    }
});

const port = 4044;
app.listen(port, () => console.log(`second-app PORTuuu == ${port}`));