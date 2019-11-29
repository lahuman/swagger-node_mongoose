# Swagger-node + Mongoose

## 준비 내역

#### Swagger-node 설치

기본적으로 설치 해야 합니다.

```
$> npm install -g swagger
```

## 설치된 기본 패키지

 - winston : log 
 - helmet : 보안 모듈
 - mongoose: MongoDB 연결 모듈


## Editor OPEN

```
$> swagger project edit
```

## service start

```
$> swagger project start
```

## 주요 내용

**app.js** 에서 처음 앱이 기동될때, connect.js를 호출하여 DB 연결을 한다.

```
require(`${__basedir}/config/connect`);
```

**connect.js** 내부를 보면 models 라는 디렉터리 밑에 존재하는 모든 모델을 자동으로 읽어 들여서 처리 한다.

```
const models = join(__basedir, 'models');

// Bootstrap models
fs.readdirSync(models)
  .filter(file => ~file.search(/^[^.].*\.js$/))
  .forEach(file => require(join(models, file)));
```

# 기동 방법

```
$> npm install
$> swagger project start
```

> 주요 샘플은 서버를 설치 후 다음 주소에 접근해서 확인 할 수 있다.

## Swagger test URL

```
http://localhost:10010/api/docs
```

## 예저 정보
### Book 

> Mongoose 를 이용한 샘플 

### Schedule

> Swagger 사용법을 알기 위핸 샘플

# 참고 자료

- [Swagger-node](https://github.com/swagger-api/swagger-node)
- [Mongoose](https://mongoosejs.com/)