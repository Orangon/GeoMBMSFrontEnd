export function formatByte(size: number): any {
    if (!size) return null;
    var num = 1024.0; //byte
    if (size < num) {
        return { size: size, unit: 'B' };
    }
    if (size < Math.pow(num, 2)) {
        return { size: (size / num).toFixed(2), unit: 'K' };
    }
    if (size < Math.pow(num, 3)) {
        return { size: (size / Math.pow(num, 2)).toFixed(2), unit: 'M' };
    }
    if (size < Math.pow(num, 4)) {
        return { size: (size / Math.pow(num, 3)).toFixed(2), unit: 'G' };
    }
    return { size: (size / Math.pow(num, 4)).toFixed(2), unit: 'T' };
}

export function formatByteToString(size: number): string {
    const tmp = formatByte(size);
    return tmp ? `${tmp.size} ${tmp.unit}` : '-';
}

export const formatFileSize = (fileByte: number): string => {
    var fileSizeByte = fileByte;
    var fileSizeMsg = '';
    if (fileSizeByte < 1048576) fileSizeMsg = (fileSizeByte / 1024).toFixed(2) + ' K';
    else if (fileSizeByte == 1048576) fileSizeMsg = '1 M';
    else if (fileSizeByte > 1048576 && fileSizeByte < 1073741824)
        fileSizeMsg = (fileSizeByte / (1024 * 1024)).toFixed(2) + ' M';
    else if (fileSizeByte > 1048576 && fileSizeByte == 1073741824) fileSizeMsg = '1 G';
    else if (fileSizeByte > 1073741824 && fileSizeByte < 1099511627776)
        fileSizeMsg = (fileSizeByte / (1024 * 1024 * 1024)).toFixed(2) + ' G';
    else fileSizeMsg = '文件超过1T';
    return fileSizeMsg;
};

export const extName = (fileName: string): string => {
    if (!fileName || typeof fileName != 'string') {
        return '';
    }
    let a = fileName.split('').reverse().join('');
    let b = a.substring(0, a.search(/\./)).split('').reverse().join('');
    return b;
};

export const fileNameWithoutExt = (filename: string): string => {
    return filename.substring(0, filename.lastIndexOf('.'));
};

export const pxWidth = (str: string, fontSize: string): number => {
    let result = 0;
    let ele = document.createElement('div');
    ele.style.position = 'absolute';
    ele.style.whiteSpace = 'nowrap';
    ele.style.fontSize = fontSize;
    ele.style.opacity = '0';
    ele.innerText = str;
    document.body.append(ele);
    result = ele.getBoundingClientRect().width;
    document.body.removeChild(ele);
    return result;
};
