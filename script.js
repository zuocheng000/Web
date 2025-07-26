document.addEventListener('DOMContentLoaded', function() {
    // 主题切换功能
    const themeSwitch = document.getElementById('theme-switch');
    
    // 检查本地存储中的主题设置
    if (localStorage.getItem('theme') === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeSwitch.checked = true;
    }
    
    // 监听主题切换
    themeSwitch.addEventListener('change', function() {
        if (this.checked) {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
        }
    });
    
    // 六宫详解模态框功能
    const infoModal = document.getElementById('info-modal');
    const infoBtn = document.getElementById('show-info');
    const closeBtn = document.querySelector('.close-btn');
    
    infoBtn.addEventListener('click', function() {
        infoModal.style.display = 'block';
    });
    
    closeBtn.addEventListener('click', function() {
        infoModal.style.display = 'none';
    });
    
    window.addEventListener('click', function(event) {
        if (event.target === infoModal) {
            infoModal.style.display = 'none';
        }
    });
    
    // 标签切换功能
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-tab');
            
            // 移除所有活动类
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // 添加活动类到当前标签
            btn.classList.add('active');
            document.getElementById(`${tabId}-tab`).classList.add('active');
            
            // 隐藏结果区域
            document.getElementById('result').classList.remove('show');
        });
    });
    
    // 加载动画控制
    function showLoading() {
        document.getElementById('loading').classList.add('show');
    }
    
    function hideLoading() {
        document.getElementById('loading').classList.remove('show');
    }
    
    // 时间起卦提交
    document.getElementById('time-submit').addEventListener('click', function() {
        const month = parseInt(document.getElementById('month').value);
        const day = parseInt(document.getElementById('day').value);
        const hour = parseInt(document.getElementById('hour').value);
        
        if (validateTimeInputs(month, day, hour)) {
            showLoading();
            
            // 模拟计算过程，增加神秘感
            setTimeout(function() {
                const result = calculateTemporalDivination(month, day, hour);
                displayResult(result);
                hideLoading();
            }, 1500);
        }
    });
    
    // 数字起卦提交
    document.getElementById('number-submit').addEventListener('click', function() {
        const num1 = parseInt(document.getElementById('num1').value);
        const num2 = parseInt(document.getElementById('num2').value);
        const num3 = parseInt(document.getElementById('num3').value);
        
        if (validateNumberInputs(num1, num2, num3)) {
            showLoading();
            
            // 模拟计算过程，增加神秘感
            setTimeout(function() {
                const result = calculateNumeralHexagram(num1, num2, num3);
                displayResult(result);
                hideLoading();
            }, 1500);
        }
    });
    
    // 验证时间输入
    function validateTimeInputs(month, day, hour) {
        if (isNaN(month) || month < 1 || month > 12) {
            alert('请输入有效的月份 (1-12)');
            return false;
        }
        
        const maxDays = new Date(new Date().getFullYear(), month, 0).getDate();
        if (isNaN(day) || day < 1 || day > maxDays) {
            alert(`请输入有效的日期 (1-${maxDays})`);
            return false;
        }
        
        if (isNaN(hour) || hour < 0 || hour > 23) {
            alert('请输入有效的小时 (0-23)');
            return false;
        }
        
        return true;
    }
    
    // 验证数字输入
    function validateNumberInputs(num1, num2, num3) {
        if (isNaN(num1) || num1 < 1 || num1 > 9) {
            alert('请输入有效的数字1 (1-9)');
            return false;
        }
        
        if (isNaN(num2) || num2 < 1 || num2 > 9) {
            alert('请输入有效的数字2 (1-9)');
            return false;
        }
        
        if (isNaN(num3) || num3 < 1 || num3 > 9) {
            alert('请输入有效的数字3 (1-9)');
            return false;
        }
        
        return true;
    }
    
    // 计算时间起卦
    function calculateTemporalDivination(month, day, hour) {
        const labels = [
            '【大安】<span class="direction">东方</span><span class="symbol">青龙</span><span class="element">五行属木</span><span class="body-part">对应人体左腿及肝脏</span>', 
            '【留连】<span class="direction">南方</span><span class="symbol">玄武</span><span class="element">五行属阴土</span><span class="body-part">对应脾胃及神经系统</span>', 
            '【速喜】<span class="direction">南方</span><span class="symbol">朱雀</span><span class="element">五行属火</span><span class="body-part">对应心脏及脑部</span>',
            '【赤口】<span class="direction">西方</span><span class="symbol">白虎</span><span class="element">五行属金</span><span class="body-part">对应肺及骨骼</span>', 
            '【小吉】<span class="direction">东方</span><span class="symbol">青龙</span><span class="element">五行属阳土</span><span class="body-part">对应肾脏及右腿</span>', 
            '【空亡】<span class="direction">北方</span><span class="symbol">玄武</span><span class="element">五行属水</span><span class="body-part">对应免疫系统</span>'
        ];
        
        // 转换时辰
        const shichen = convertToShichen(hour);
        
        // 计算月落位置
        const initialPosition = month;
        const initialLabel = getPositionLabel(labels, initialPosition);
        
        // 计算日落位置
        const startIndex = labels.indexOf(initialLabel);
        const fourthPosition = (startIndex + day - 1) % labels.length;
        const fourthLabel = labels[fourthPosition];
        
        // 计算时落位置
        const sixthPosition = (fourthPosition + shichen - 1) % labels.length;
        const sixthLabel = labels[sixthPosition];
        
        // 提取标签名称
        const label1 = extractLabelName(fourthLabel);
        const label2 = extractLabelName(sixthLabel);
        
        // 获取解释
        const interpretation = getInterpretation(label1, label2);
        
        return {
            monthLabel: initialLabel,
            dayLabel: fourthLabel,
            hourLabel: sixthLabel,
            interpretation: interpretation
        };
    }
    
    // 计算数字起卦
    function calculateNumeralHexagram(num1, num2, num3) {
        const labels = [
            '【大安】<span class="direction">东方</span><span class="symbol">青龙</span><span class="element">五行属木</span><span class="body-part">对应人体左腿及肝脏</span>', 
            '【留连】<span class="direction">南方</span><span class="symbol">玄武</span><span class="element">五行属阴土</span><span class="body-part">对应脾胃及神经系统</span>', 
            '【速喜】<span class="direction">南方</span><span class="symbol">朱雀</span><span class="element">五行属火</span><span class="body-part">对应心脏及脑部</span>',
            '【赤口】<span class="direction">西方</span><span class="symbol">白虎</span><span class="element">五行属金</span><span class="body-part">对应肺及骨骼</span>', 
            '【小吉】<span class="direction">东方</span><span class="symbol">青龙</span><span class="element">五行属阳土</span><span class="body-part">对应肾脏及右腿</span>', 
            '【空亡】<span class="direction">北方</span><span class="symbol">玄武</span><span class="element">五行属水</span><span class="body-part">对应免疫系统</span>'
        ];
        
        // 将1-9的输入转换为1-6的范围
        const convertedNum1 = ((num1 - 1) % 6) + 1;
        const convertedNum2 = ((num2 - 1) % 6) + 1;
        const convertedNum3 = ((num3 - 1) % 6) + 1;
        
        // 计算月落位置
        const initialPosition = convertedNum1;
        const initialLabel = getPositionLabel(labels, initialPosition);
        
        // 计算日落位置
        const startIndex = labels.indexOf(initialLabel);
        const fourthPosition = (startIndex + convertedNum2 - 1) % labels.length;
        const fourthLabel = labels[fourthPosition];
        
        // 计算时落位置
        const sixthPosition = (fourthPosition + convertedNum3 - 1) % labels.length;
        const sixthLabel = labels[sixthPosition];
        
        // 提取标签名称
        const label1 = extractLabelName(fourthLabel);
        const label2 = extractLabelName(sixthLabel);
        
        // 获取解释
        const interpretation = getInterpretation(label1, label2);
        
        return {
            monthLabel: initialLabel,
            dayLabel: fourthLabel,
            hourLabel: sixthLabel,
            interpretation: interpretation
        };
    }
    
    // 获取位置对应的标签
    function getPositionLabel(labels, position) {
        return labels[(position - 1) % labels.length];
    }
    
    // 从带属性的标签中提取核心名称
    function extractLabelName(fullLabel) {
        const match = fullLabel.match(/【(.*?)】/);
        return match ? match[1] : fullLabel;
    }
    
    // 将24小时制转换为对应的时辰数字（1-12）
    function convertToShichen(hour) {
        const shichenRanges = [
            { start: 23, end: 1, num: 1 },  // 子时
            { start: 1, end: 3, num: 2 },   // 丑时
            { start: 3, end: 5, num: 3 },   // 寅时
            { start: 5, end: 7, num: 4 },   // 卯时
            { start: 7, end: 9, num: 5 },   // 辰时
            { start: 9, end: 11, num: 6 },  // 巳时
            { start: 11, end: 13, num: 7 }, // 午时
            { start: 13, end: 15, num: 8 }, // 未时
            { start: 15, end: 17, num: 9 }, // 申时
            { start: 17, end: 19, num: 10 },// 酉时
            { start: 19, end: 21, num: 11 },// 戌时
            { start: 21, end: 23, num: 12 } // 亥时
        ];
        
        for (const range of shichenRanges) {
            if (range.start <= hour && hour < range.end) {
                return range.num;
            }
            // 特殊处理子时跨天的情况
            if (range.start === 23 && (hour >= 23 || hour < 1)) {
                return range.num;
            }
        }
        
        return 1; // 默认子时
    }
    
    // 获取解释
    function getInterpretation(label1, label2) {
        const interpretations = {
            // 大安相关组合
            '大安留连': '办事不周全，失物西北去，婚姻晚几天。',
            '大安速喜': '事事自己起，失物当日见，婚姻自己提。',
            '大安赤口': '办事不顺手，失物不用找，婚姻两分手。',
            '大安小吉': '事事从己及，失物不出门，婚姻成就地。',
            '大安空亡': '病人要上床，失物无踪影，事事不顺情。',
            '大安大安': '大安事事昌，求财在坤方，失物去不远，宅舍保安康。行人身未动，病者主无妨，将军回田野，仔细兴推祥',
            
            // 留连相关组合
            '留连大安': '办事两分张，婚姻有喜事，先苦后来甜。',
            '留连速喜': '事事由自己，婚姻有成意，失物三天里。',
            '留连赤口': '病者死人口，失物准丢失，婚姻两分手。',
            '留连小吉': '事事不用提，失物东南去，病者出人齐。',
            '留连空亡': '病人准死亡，失物不见面，婚姻两分张。',
            '留连留连': '留连事难成，求谋月末明，凡事只宜缓，去者未回程。行人身未动，病者主无妨，将军回田野，仔细兴推祥',
            
            // 速喜相关组合
            '速喜赤口': '自己往外走，失物往正北，婚姻得勘走。',
            '速喜小吉': '婚姻有人提，病人当天好，失物在家里。',
            '速喜空亡': '婚姻有分张，病者积极治，失物不久见。',
            '速喜大安': '事事都平安，婚姻成全了，占病都相安。',
            '速喜留连': '婚姻不可言，失物无信息，病人有仙缘。',
            '速喜速喜': '速喜喜来临，求财向南行，失物申未午，逢人路上寻。行人身未动，病者主无妨，将军回田野，仔细兴推祥',
            
            // 赤口相关组合
            '赤口小吉': '办事自己提，婚姻不能成，失物无信息。',
            '赤口空亡': '无病也上床，失物不用找，婚姻不能成。',
            '赤口大安': '办事险和难，失物东北找，婚姻指定难。',
            '赤口留连': '办事有困难，行人在外走，失物不归还。',
            '赤口速喜': '婚姻在自己，失物有着落，办事官事起。',
            '赤口赤口': '赤口主口舌，官非切要防，失物急去寻，行人有惊慌。六畜多惊怪，病者出西方，更须防诅咒，恐怕染瘟疫',
            
            // 小吉相关组合
            '小吉空亡': '病人不妥当，失物正东找，婚姻再想想。',
            '小吉大安': '事事两周全，婚姻当日定，失物自己损。',
            '小吉留连': '事事有反还，婚姻有人破，失物上西南。',
            '小吉速喜': '事事从头起，婚姻能成就，失物在院里。',
            '小吉赤口': '办事往外走，婚姻有难处，失物丢了手。',
            '小吉小吉': '小吉最吉昌，路上好商量，阴人来报喜，失物在坤方；行人立便至，交易甚是强，凡是皆和合，病者辱上苍',
            
            // 空亡相关组合
            '空亡大安': '事事不周全，婚姻从和好，失物反复间。',
            '空亡留连': '办事处处难，婚姻重新定，失物永不还。',
            '空亡速喜': '事事怨自己，婚姻有一定，失物在家里。',
            '空亡赤口': '办事官非有，婚姻难定准，失物往远走。',
            '空亡小吉': '事事有猜疑，婚姻有喜事，失物回家里。',
            '空亡空亡': '空亡事不祥，阴人多乖张，求财无利益，行人有灾殃；失物寻不见，官事有刑伤，病人逢暗鬼，禳解保安康'
        };
        
        return interpretations[`${label1}${label2}`] || '无对应速断口诀';
    }
    
    // 显示结果
    function displayResult(result) {
        document.getElementById('month-label').innerHTML = result.monthLabel;
        document.getElementById('day-label').innerHTML = result.dayLabel;
        document.getElementById('hour-label').innerHTML = result.hourLabel;
        document.getElementById('interpretation-text').textContent = result.interpretation;
        
        // 根据宫位名称添加特定的类
        addClassByContent('month-label');
        addClassByContent('day-label');
        addClassByContent('hour-label');
        
        document.getElementById('result').classList.add('show');
        
        // 高亮显示结果中的关键词
        highlightKeywords();
        
        // 滚动到结果区域
        document.getElementById('result').scrollIntoView({ behavior: 'smooth' });
    }
    
    // 根据内容添加特定的类
    function addClassByContent(elementId) {
        const element = document.getElementById(elementId);
        const content = element.innerHTML;
        
        // 移除所有可能的类
        element.classList.remove('gong-daan', 'gong-liulian', 'gong-suxi', 'gong-chikou', 'gong-xiaoji', 'gong-kongwang');
        
        // 根据内容添加特定的类
        if (content.includes('【大安】')) {
            element.classList.add('gong-daan');
        } else if (content.includes('【留连】')) {
            element.classList.add('gong-liulian');
        } else if (content.includes('【速喜】')) {
            element.classList.add('gong-suxi');
        } else if (content.includes('【赤口】')) {
            element.classList.add('gong-chikou');
        } else if (content.includes('【小吉】')) {
            element.classList.add('gong-xiaoji');
        } else if (content.includes('【空亡】')) {
            element.classList.add('gong-kongwang');
        }
    }
    
    // 高亮显示结果中的关键词
    function highlightKeywords() {
        const interpretationText = document.getElementById('interpretation-text');
        let text = interpretationText.textContent;
        
        // 关键词列表及其对应的颜色
        const keywords = [
            { word: '婚姻', color: '#e91e63' },
            { word: '失物', color: '#2196f3' },
            { word: '病者', color: '#ff9800' },
            { word: '行人', color: '#4caf50' },
            { word: '事事', color: '#9c27b0' },
            { word: '求财', color: '#ff5722' },
            { word: '官事', color: '#795548' }
        ];
        
        // 替换关键词为带颜色的span
        keywords.forEach(item => {
            const regex = new RegExp(item.word, 'g');
            text = text.replace(regex, `<span style="color:${item.color};font-weight:bold;">${item.word}</span>`);
        });
        
        interpretationText.innerHTML = text;
    }
    
    // 复制结果功能
    document.getElementById('copy-result').addEventListener('click', function() {
        const monthLabel = document.getElementById('month-label').textContent;
        const dayLabel = document.getElementById('day-label').textContent;
        const hourLabel = document.getElementById('hour-label').textContent;
        const interpretation = document.getElementById('interpretation-text').textContent;
        
        const resultText = `小六壬算卦结果\n\n月落: ${monthLabel}\n日落: ${dayLabel}\n时落: ${hourLabel}\n\n速断口诀: ${interpretation}`;
        
        navigator.clipboard.writeText(resultText).then(function() {
            showTooltip('结果已复制到剪贴板');
        }, function() {
            showTooltip('复制失败，请手动复制');
        });
    });
    
    // 保存为图片功能
    document.getElementById('save-image').addEventListener('click', function() {
        const resultElement = document.getElementById('result');
        
        // 使用html2canvas库将结果区域转换为图片
        if (typeof html2canvas !== 'undefined') {
            html2canvas(resultElement).then(function(canvas) {
                const link = document.createElement('a');
                link.download = '小六壬算卦结果.png';
                link.href = canvas.toDataURL('image/png');
                link.click();
            });
        } else {
            // 如果html2canvas未加载，加载它
            const script = document.createElement('script');
            script.src = 'https://html2canvas.hertzen.com/dist/html2canvas.min.js';
            script.onload = function() {
                html2canvas(resultElement).then(function(canvas) {
                    const link = document.createElement('a');
                    link.download = '算卦结果.png';
                    link.href = canvas.toDataURL('image/png');
                    link.click();
                });
            };
            document.head.appendChild(script);
        }
    });
    
    // 显示提示信息
    function showTooltip(message) {
        let tooltip = document.querySelector('.copy-tooltip');
        
        if (!tooltip) {
            tooltip = document.createElement('div');
            tooltip.className = 'copy-tooltip';
            document.body.appendChild(tooltip);
        }
        
        tooltip.textContent = message;
        tooltip.classList.add('show');
        
        setTimeout(function() {
            tooltip.classList.remove('show');
        }, 2000);
    }
});