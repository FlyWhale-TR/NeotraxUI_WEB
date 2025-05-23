// slider
function input_slider_init(){
    // 获取所有滑块
    const elements = document.querySelectorAll('.NUI-control-input-range');

    // 遍历每个符合条件的元素
    elements.forEach(element => {
        // 检查元素是否有 max 属性
        if (element.hasAttribute('max')) {
            // 获取 max 属性的值并转换为数字
            const maxValue = parseFloat(element.getAttribute('max'));

            // 如果 max 值是有效数字，则乘以 1000 并更新属性
            if (!isNaN(maxValue)) {
                if  (maxValue >= 1) {
                const newValue = maxValue * 1000;
                element.setAttribute('max', newValue.toString());
                }else {
                    console.log('%c错误:滑块max属性需要大于1!', 'color: #FF0000;');
                    element.setAttribute('max', 1000);
                }
            }
        }
    });
}

function slider_init() {

    const slider = document.getElementById('NUI-slider');
    const thumb = document.getElementById('NUI-thumb');
    const track = document.getElementById('NUI-track');

    // 配置参数
    const SNAP_POINTS = slider.dataset.length; // 定位点数量
    let isDragging = false;
    let startX, startLeft;
    
    // 计算定位点间隔
    function getStep() {
        return slider.offsetWidth / (SNAP_POINTS - 1);
    }

    // 吸附到最近定位点
    function snapToPosition(currentX) {
        const step = getStep();
        const index = Math.round(currentX / step);
        return Math.max(0, Math.min(index * step, slider.offsetWidth));
    }

    // 更新进度条
    function updatetrack(left) {
        track.style.width = `${((left / slider.offsetWidth) * 100) + 1}%`;
    }

    // 添加 transition 类控制函数
    function enableTransition() {
        thumb.classList.add('NUI-control-input-slider_transition');
        track.classList.add('NUI-control-input-slider_transition');
    }

    function disableTransition() {
        thumb.classList.remove('NUI-control-input-slider_transition');
        track.classList.remove('NUI-control-input-slider_transition');
    }

    // 拖拽事件处理
    thumb.addEventListener('mousedown', (e) => {
        isDragging = true;
        disableTransition(); // 拖拽时禁用过渡
        startX = e.clientX;
        startLeft = thumb.offsetLeft;
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;

        const newLeft = startLeft + (e.clientX - startX);
        const maxLeft = slider.offsetWidth - thumb.offsetWidth;
        const clamped = Math.max(0, Math.min(newLeft, maxLeft));

        thumb.style.left = `${clamped}px`;
        updatetrack(clamped);
    });

    document.addEventListener('mouseup', () => {
        if (!isDragging) return;
        enableTransition(); // 松开时启用过渡
        const snapped = snapToPosition(thumb.offsetLeft);
        thumb.style.left = `${snapped}px`;
        updatetrack(snapped);
        isDragging = false;
    });

    // 点击轨道跳转
    slider.addEventListener('click', (e) => {
        const rect = slider.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const snapped = snapToPosition(clickX);
        enableTransition(); // 新增：启用过渡动画
        thumb.style.left = `${snapped}px`;
        updatetrack(snapped);
    });

    // 修改拖拽事件处理
    thumb.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.clientX;
        startLeft = thumb.offsetLeft;
    });
}

function init() { 
    input_slider_init()
    slider_init()
}

document.addEventListener('DOMContentLoaded', init)