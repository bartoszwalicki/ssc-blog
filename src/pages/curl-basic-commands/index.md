---
title: "Basic cURL HTTP commands"
date: "2020-11-19"
updatedDate: "2020-11-19"
abstract: "GET, POST, PUT, PATCH with headers and JSON data. Quick one."
---

[cURL](https://curl.se/) is versatile URL request tool that is vastly used among web developers, every one should know at least basics. If you have any problems with endpoint provided by backend it is best to provide in bug ticket cURL request that is failing. You don't argue with cURL.

## GET

```
curl 'https://example.com/posts/1'
```

## GET with header

Note `\` at the end of the first line, it is new line brake character.

```
curl --header 'accept: application/json, text/plain, */*' \
      'https://example.com/posts/1'
```

## GET with params

```
curl 'https://example.com/posts?userId=1'
```

## POST with header and JSON data

```
    curl --header "Content-Type:application/json" \
         --data "{\"title\":\"foo\",\"body\":\"bar\",\"userId\":\"1\"}" \
          'https://example.com/posts'
```

Most common mistake in this type of query is forcing `cURL` to change request type by `-X POST` or `--request POST`. `cURL` don't need this for POST, it will invoke POST method thanks to `--data` parameter.

JSON placed in `--data` parameter must be stringified. There are a lot of tools to stringify JSON online, like [JSON Stringify Online Tool](http://rantz.net/tools/stringify/index.php).

## POST with form data (multipart)

```
curl  -F firstName=john \
      -F lastName=doe \
      -F cv=@pathToFile.pdf 'http://example.com/submit'
```

## PUT with header and JSON data

```
curl --request PUT \
     --data "{\"title\":\"foo\",\"body\":\"bar\",\"userId\":\"1\"}" \
     --header "Content-Type:application/json" \
      'https://example.com/posts/1'
```

Now `-X PUT` or `--request PUT` is expected. POST, PUT and PATCH are similar, `cURL` must know which request type we would like to perform.

## PATCH with header and JSON data

```
curl --request PATCH \
     --header "Content-Type:application/json" \
     --data "{\"title\":\"foo\"}" \
      'https://example.com/posts/1'
```

## DELETE

```
curl --request DELETE \
      'https://example.com/posts/1'
```

## Useful options

### Include response headers and status code in the output

Most likely you would like to get response header and response code, then add `--include` or short `-i` option with your request.

```
curl 'https://example.com/posts/1' -i
```

### Include verbose data with transmission details and request headers

Add `--verbose` or `-v`.

```
curl 'https://example.com/posts/1' -v
```

## Resources

- [Everything curl - great cURL guide](https://ec.haxx.se/http/)
- [cURL manpage](https://curl.se/docs/manpage.html)
