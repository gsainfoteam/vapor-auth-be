ERD: https://dbdocs.io/siwonpada/vapor_auth_be

staging_url: https://api.stg.auth.vapor.gistory.me  
staging_swagger_url: https://api.stg.auth.vapor.gistory.me/api

Group CRUD
Confirm Group -> when the create the group
User Role in the Group
Group name Unique
check if the user in the group

endpoints  
GET /group  
GET /group/:groupname  
POST /group  
PATCH /group  
DELETE /group  
GET /group/:groupname/member  
POST /group/:groupname/member  
DELETE /group/:groupname/member/:uuid  
GET /group/:groupname/member/:uuid/role  
POST /group/:groupname/member/:uuid/role/:id  
GET /group/:groupname/role  
POST /group/:groupname/role  
UPDATE /group/:groupname/role  
DELETE /group/:groupname/role
