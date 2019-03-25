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

