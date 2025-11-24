create a documentation .md file with mermaid diagrams for ci/cd and release process. 

info:
ci/cd is running via github
restricted branches are main, dev, and releave/v*
you can only merge from dev to main
code pushes to release and pre-release branches are restricted to PRs only, no forced push allowed (excluding ci automated pushes, ex. CHANGELOG.md update)
we are using semantic release (ex: v1.2.3, or v1.2.4-dev.2 etc. and major tags suck as latest and v1, v2, etc.)
release branch is main, pre-release is develop, and release branch snapshots for hotfixes etc are release/v* 
code base includes: python, js, sql, dbt, terraform 

here is the descripion of process:
>on feature/fix branch push pipeline has: 
 - code ci: format, prettier, lint, test etc
 - dev build

>from feature/fix branch you create PR to develop
on pr run preliminary checks:
 - semantic release dry run: get next-version, next-release-bool, major-version and major-release-bool
 - code deploy ci: artifactory ci and permissions output
 - infrastructure plan output: terrafrorm plan output
 - add/update outputs of next release and version, ci and plan to PR as a comment/description

>on push to dev:
 - run semantic release: creates pre-release version, pre-release tag, release record in github and updates changelog with [ci skip]
 - deploy build artifacts and packages to python/npm/artifactory/docker etc to DEV
 - deploy infrastructure (using artifacts ) to DEV

>on dev to main:
 - deploy infrastructure (using artifacts ) to PROD
 - update major version tag

>on PR merge to main (don't mix with "on push to main") 
 - pipeline runs "main major release pipeline", where it create a release/v* snapshot branch (for hotfixes, etc) with major tag name (ex. release/v1, release/v2 etc)

>or push to releave/v* branch 
 - run semantic release: creates pre-release version, pre-release tag, release record in github and updates changelog with [ci skip]
 - deploy build artifacts and packages to python/npm/artifactory/docker etc to DEV
 - deploy infrastructure (using artifacts ) to DEV

ask question, clarify if something is missing, look for improvements

1. Should main merges also run semantic release to create production versions? - yes
2. Are PROD deployments using DEV artifacts or rebuilding - yes (artifacts are environment agnostic and environment specific configuration is done with confic file and deployment)
3. How are hotfixes merged back (to main, then dev)? they are merge to dev, from release hotfix via cherypicking, and then to main
4. Are PR checks run for both dev and main PRs? - only for dev
5. Are snapshots created on every main merge or only major bumps? - only major bump
💡 
    Suggested Improvements (listed in the doc):
Enhanced branch protection with required reviewers - include
Additional testing gates (integration, e2e, smoke tests) that is part of test checks for dev
Automated rollback strategy - add this
Notification integrations (Slack, PagerDuty) - no need
DORA metrics tracking - no 