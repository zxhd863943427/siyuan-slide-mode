async function 向思源请求数据(url, data) {
    let resData = null
    await fetch(url, {
        body: JSON.stringify(data),
        method: 'POST',

    }).then(function (response) { resData = response.json() })
    return resData
}
export async function 以id获取文档块markdown(文档id) {
    let data = {
        id: 文档id,
    }
    let url = '/api/export/exportMdContent'
    return 解析响应体(向思源请求数据(url, data))
    //文档hepath与Markdown 内容
}
async function 解析响应体(response) {
    let r = await response
    // console.log(r)
    return r.code === 0 ? r.data : null
}
