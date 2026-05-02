kubectl get all
kubectl get svc
kubectl get pods -w
kubectl delete svc <name>

kubectl logs -f <pod-name>
kubectl get pods --show-labels
kubectl logs -f -l app=node-app-service-babu23 --all-containers

kubectl describe pod <pod-name>
kubectl port-forward svc/<name> 3000:80
kubectrl get endpoints my-node-app-service23
kubectl config current-context

skaffold dev
skaffold delete
- skaffold & helm == designed to be resilient
- old resources arent automatically deleted unless the cleanup process completes successfully

k8s is like OS; minikube is laptop
- real k8s cluster (AWS EKS) -- massive fleet of servers (node) in a data center
- minikube is a tool taht shrinks the entire fleet into a single VM; can run on our personal computer
- minikube start
    starts a virtual node (docker container)
    installs k8s components (api-server, scheduler, kubelet) -- which look after routing across PODs, scaling up & down





minikube status
minikube dashboard
minikube ip
minikube service <name>
