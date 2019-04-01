# chat-api

## 1. 登录注册及用户信息

### 1.1 注册
```
POST /auth/register
```

* 参数

body:

```
{
	"username": "lightPiggy1",
	"password": "piggy123"
}
```

* 返回

```
{
    "errcode": 0,
    "data": {
        "nickname": "lightPiggy1",
        "birthday": "2019-03-25"
    }
}
```

### 1.2 登录
```
POST /auth/login
```

* 参数

query:

```
{
    "device_id": "cdxxxxf0-8fed-40b1-9999-37ca410af999",
    "device_type": "web"
}
```

body:

```
{
	"username": "lightPiggy1",
	"password": "piggy123"
}
```

* 返回

```
{
    "errcode": 0,
    "data": {
        "user_id": "f7e057d1a178b3a5c6c5a9df80165e57",
        "device_id": "cdxxxxf0-8fed-40b1-9999-37ca410af999",
        "device_type": "web",
        "login_at": "2019-03-25T11:23:11.121Z"
    }
}
```

### 1.3 鉴权

除了登录注册api以外，其他的api都需要在query里带上user_id和device_id作为是否已登录的鉴权

未鉴权成功会返回errcode 401

### 1.4 获取用户目前已登录的设备
```
GET /users/:user_id/login_devices
```

* 返回

```
{
    "errcode": 0,
    "data": {
        "total": 1,
        "items": [
            {
                "device_id": "cdxxxxf0-8fed-40b1-9999-37ca410af999",
                "device_type": "web",
                "login_at": "2019-03-25T11:23:11.121Z"
            }
        ]
    }
}
```

### 1.5 删除用户已登录的某个设备（不能删除当前设备）
```
DELETE /users/:user_id/login_devices/:device_id
```

* 返回 (删除后的设备列表)

```
{
    "errcode": 0,
    "data": {
        "total": 1,
        "items": [
            {
                "device_id": "cdxxxxf0-8fed-40b1-9999-37ca410af999",
                "device_type": "web",
                "login_at": "2019-03-25T11:23:11.121Z"
            }
        ]
    }
}
```

### 1.6 检查用户名是否已被注册
```
GET /auth/username_exist
```

* 参数

query:

```
{
    "username": "lightPiggy"
}
```

* 返回

```
{
    "errcode": 0,
    "data": {
        "exists": true
    }
}
```
