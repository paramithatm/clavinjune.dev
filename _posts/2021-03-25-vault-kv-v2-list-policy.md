---
title: Vault KV-V2 list policy
category: Notes
tags: infrastructure hashicorp vault
description: >
  This post contains notes on how to create vault policy to show KV-V2 secrets config in Vault UI
---

Enable kv-v2 on secrets `secret`

```bash
$ vault kv enable-versioning secret
```

Put something inside secrets `secret`

```bash
$ vault kv put secret/your-path your-key=your-value
```

Create policy file

```bash
$ tee policyfile.hcl <<EOF
path "secret/*" {
  capabilities = [ "list" ]
}
path "secret/data/your-path" {
  capabilities = [ "list", "read" ]
}
path "secret/metadata/your-path" {
  capabilities = ["list"]
}
EOF
```

Apply the policy file to your role

```bash
$ vault policy write your-role policyfile.hcl
```