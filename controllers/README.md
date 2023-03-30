# Controllers

## Request params, query & body

```http
POST https://example.com/:animals/v1/:tree/v2?page=1&age=20
content-type: application/json
{
    "name": "sample",
    "time": "Wed, 21 Oct 2015 18:27:50 GMT"
}
```

- `animals` and `tree` are the `request.params`
- `page` and `age` are the `request.query`
- `name` and `time` are in the `request.body`

## Miscellaneous

- Mongoose: [MongoDB](https://youtu.be/bALyYC10ABw) or
  [Web Dev Simplified](https://youtu.be/DZBGEVgL2eE)
- JavaScript Object Destructuring: [JavaScript Tutorial](https://www.javascripttutorial.net/es6/javascript-object-destructuring/)
