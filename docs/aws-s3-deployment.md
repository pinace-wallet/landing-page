# AWS S3 Deployment

This Next.js landing page is configured for static export. `npm run build` in `build/` writes the deployable site to `build/out`, and `.github/workflows/deploy-s3.yml` syncs that folder to S3 on every push to `master`.

## Recommended Setup

Use the CloudFormation template in `infra/aws/static-site.yml` to create:

- private S3 bucket for static assets
- CloudFront distribution with HTTPS
- S3 bucket policy that only allows CloudFront reads
- GitHub Actions OIDC deploy role trusted only by `pinace-wallet/landing-page` on `master`

Deploy it from your AWS account:

```bash
aws cloudformation deploy \
  --stack-name pinace-landing-page \
  --template-file infra/aws/static-site.yml \
  --capabilities CAPABILITY_NAMED_IAM \
  --parameter-overrides BucketName=YOUR_GLOBALLY_UNIQUE_BUCKET_NAME
```

If your AWS account already has the GitHub Actions OIDC provider, add:

```bash
CreateGitHubOidcProvider=false
```

After the stack finishes, copy its outputs into the GitHub secrets below.

## GitHub Secrets

Add these repository secrets in GitHub:

| Secret | Required | Description |
| --- | --- | --- |
| `AWS_ROLE_TO_ASSUME` | Yes | IAM role ARN trusted by GitHub Actions OIDC. |
| `AWS_REGION` | Yes | AWS region for the S3 bucket, for example `us-east-1`. |
| `S3_BUCKET` | Yes | S3 bucket name only, without `s3://`. |
| `CLOUDFRONT_DISTRIBUTION_ID` | No | CloudFront distribution to invalidate after upload. |

## Manual AWS Setup

1. Create an S3 bucket and enable static website hosting if you serve directly from S3.
2. Prefer CloudFront in front of the bucket for HTTPS, caching, and custom domains.
3. Create an IAM role for GitHub Actions using OIDC. Trust only this private repo and the `master` branch.
4. Grant the role least-privilege permissions for the target bucket and optional CloudFront invalidation.

Example permissions policy:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:ListBucket"
      ],
      "Resource": "arn:aws:s3:::YOUR_BUCKET_NAME"
    },
    {
      "Effect": "Allow",
      "Action": [
        "s3:DeleteObject",
        "s3:GetObject",
        "s3:PutObject"
      ],
      "Resource": "arn:aws:s3:::YOUR_BUCKET_NAME/*"
    },
    {
      "Effect": "Allow",
      "Action": [
        "cloudfront:CreateInvalidation"
      ],
      "Resource": "*"
    }
  ]
}
```

Example trust policy condition:

```json
{
  "StringEquals": {
    "token.actions.githubusercontent.com:aud": "sts.amazonaws.com"
  },
  "StringLike": {
    "token.actions.githubusercontent.com:sub": "repo:OWNER/REPO:ref:refs/heads/master"
  }
}
```

Replace `OWNER/REPO` and `YOUR_BUCKET_NAME` before applying these policies.
