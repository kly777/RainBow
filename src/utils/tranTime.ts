import dayjs from "dayjs";

// 将日期格式化为YYYY-MM-DD HH:mm 格式的函数
function formatDateTime(date: Date) {
    if (!date) {
        console.error('输入的日期为空');
        return null;
    }
    // 确保date是一个有效的dayjs对象
    const dayjsDate = dayjs(date);
    if (!dayjsDate.isValid()) {
        console.error('输入的不是一个有效的日期对象');
        return null;
    }
    // 返回格式化后的日期字符串
    return dayjsDate.format('YYYY-MM-DD HH:mm');
}

function formatDate(date: Date) {
    if (!date) {
        console.error('输入的日期为空');
        return null;
    }
    // 确保date是一个有效的dayjs对象
    const dayjsDate = dayjs(date);
    if (!dayjsDate.isValid()) {
        console.error('输入的不是一个有效的日期对象');
        return null;
    }
    // 返回格式化后的日期字符串
    return dayjsDate.format('YYYY-MM-DD');
}

export {
    formatDateTime,
    formatDate,
}

