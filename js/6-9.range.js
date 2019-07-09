module.exports = (totalSize, req, res) => {
    const range = req.headers['range'];
    if (!range){    // 如果拿不到 range
        return {code: 200};   // 表示处理不了，直接返回 200，正常的返回就好了。
    }

    const sizes = range.match(/bytes=(\d*)-(\d*)/);   // * 号表示 重复零次或多次，可以有 也可以没有
    // 用 match 如果匹配到的话，会返回长度为3 的数组，第一个表示匹配到的内容，第二个表示 第一个 \d* , 第三个表示 第二个 \d*
    const end = sizes[2] || totalSize - 1;
    const start = sizes[1] || totalSize - end;

    // 接下来我们要判断一些非法条件
    if (start > end || start < 0 || end > totalSize){
        return {code: 200};
    }

    // 下面是可以处理时，返回的结果
    res.setHeader('Accept-Ranges', 'bytes');
    res.setHeader('Content-Ranges', `bytes ${start}-${end}/${totalSize}`);
    res.setHeader('Content-length', end - start);
    return {
        code: 206,   // part of content 表示部分内容
        start: parseInt(start),
        end: parseInt(end)
    };
}