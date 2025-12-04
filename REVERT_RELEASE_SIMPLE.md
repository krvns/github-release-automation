Query:
Existing release process: 
...

Create a documentation to describe the way for safely reverting and redeploying releases in dev prod environments. Identify gaps and risks in existing processes.
A documented strategy outlining the end-to-end revert and redeploy process.


## Release and revert process

Develop release:
```mermaid
flowchart LR
    A[PR] --> A1[Release Branch]
    D2 --> A
    A1 --> E[Update CHANGELOG<br>'ci skip'] -->
    B --> C[New release and tag]
    B --> D[Terraform Deploy]
    A --> D1[Revert PR]
    A1 -->|push| B[Release Pipeline]
    B --> D3
    D1 --> D3[Terraform destroy<br>manual]
    D1 --> D2[Revert branch]
```