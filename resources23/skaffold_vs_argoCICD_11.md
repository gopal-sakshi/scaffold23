Skaffold built for your local laptop
Argo CD is built for your actual production cluster.

`Skaffold`
- Skaffold is a Development Tool. 
- Its primary job is to make your local coding loop as fast as possible.
- Where it runs: On your local computer, watching your VS Code or terminal.
- How it triggers: Instantly, every single time you hit Ctrl + S to save a .js or .yaml file.
- What it does: It intercepts your local code changes, 
    automatically triggers a docker build, pushes it to your local Minikube repository, 
    updates your Helm templates, and streams the logs straight back to your screen.



`Argo CD`
- Argo CD is a Deployment Tool. 
- Specifically, it is a GitOps Continuous Delivery (CD) controller 
- lives permanently inside an actual remote cluster (like AWS, Azure, bare-metal server).
- Where it runs: Permanently inside your production or staging Kubernetes cluster.
- How it triggers: It continuously watches a Git repository (like GitHub, GitLab), not your laptop.
- What it does: It pulls your production branch
    compares the code in GitHub to what is actually running in the cluster. 
    If someone modifies a file in GitHub, Argo CD notices the difference 
    automatically updates the production cluster to match Git perfectly.


