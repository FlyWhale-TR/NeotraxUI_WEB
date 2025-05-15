// 创建媒体查询监听器
const darkModeMedia = window.matchMedia('(prefers-color-scheme: dark)');

// 定义回调函数
function handleColorSchemeChange(e) {
    const isDark = e.matches; // true 表示暗色模式
    // document.body.classList.toggle('dark-mode', isDark);
    console.log('当前模式:', isDark ? '暗色' : '亮色');
}
// 绑定事件监听
darkModeMedia.addEventListener('change', handleColorSchemeChange);

// 初始化检测
handleColorSchemeChange(darkModeMedia);

function SwitchDarkMode() {
}

function SwitchLightMode() {
}

function SwitchAutoMode() {
}