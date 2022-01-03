0. Create k8s cluster and config kubectl ctx locally (see infra)
1. Deploy load balancer (we use a helm chart for it, so install helm first https://helm.sh/docs/intro/install/) 

See also https://docs.nginx.com/nginx-ingress-controller/installation/installation-with-helm/


`kubectl apply -f load-balancer/00-namespace`
`kubectl ns nginx-ingress `
`helm repo add nginx-stable https://helm.nginx.com/stable`
`helm repo update`
`helm install nginx-ingress nginx-stable/nginx-ingress`


Output

```
NAME: nginx-ingress
LAST DEPLOYED: Mon Jan  3 09:45:34 2022
NAMESPACE: nginx-ingress
STATUS: deployed
REVISION: 1
TEST SUITE: None
NOTES:
The NGINX Ingress Controller has been installed.
```

You should see the NodeBalancer created on linode dashboard.

2. Deploy the k8s prod objects

