// implementation.js - 조치사항 페이지 향상된 스크립트

document.addEventListener('DOMContentLoaded', function() {
    // 페이지 로드 애니메이션 
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in');
    
    function checkAnimation() {
        const triggerBottom = window.innerHeight * 0.85;
        
        animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < triggerBottom) {
                element.classList.add('active');
            }
        });
    }
    
    // 초기 체크 및 스크롤 이벤트 리스너 추가
    checkAnimation();
    window.addEventListener('scroll', checkAnimation);
    
    // 카운터 애니메이션
    function animateCounter(counter, target, duration = 2000) {
        let startTime = null;
        const startValue = 0;
        
        function updateCounter(timestamp) {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const value = Math.floor(progress * (target - startValue) + startValue);
            
            counter.textContent = value;
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        }
        
        requestAnimationFrame(updateCounter);
    }
    
    // 인터섹션 옵저버로 화면에 보이는 요소에 대해서만 카운터 애니메이션 실행
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counters = entry.target.querySelectorAll('.counter');
                counters.forEach(counter => {
                    const target = parseInt(counter.getAttribute('data-target'));
                    animateCounter(counter, target);
                });
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    // 카운터가 포함된 요소 관찰 시작
    document.querySelectorAll('.counter').forEach(counter => {
        counterObserver.observe(counter.parentElement);
    });
    
    // 로드맵 타임라인 항목 애니메이션
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    function checkTimeline() {
        const triggerBottom = window.innerHeight * 0.8;
        
        timelineItems.forEach((item, index) => {
            const itemTop = item.getBoundingClientRect().top;
            
            if (itemTop < triggerBottom) {
                setTimeout(() => {
                    item.classList.add('active');
                }, index * 200); // 각 항목마다 약간의 딜레이를 주어 순차적으로 나타나게 함
            }
        });
    }
    
    // 초기 체크 및 스크롤 이벤트 리스너 추가
    checkTimeline();
    window.addEventListener('scroll', checkTimeline);
    
    // 이미지 로드 시 애니메이션 효과
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('load', () => {
            img.classList.add('loaded');
        });
        
        // 이미 로드된 이미지에 대한 처리
        if (img.complete) {
            img.classList.add('loaded');
        }
    });
    
    // 인터랙티브 요소에 호버 효과 적용
    const interactiveElements = document.querySelectorAll('.card-hover, .personnel-card, .hover-effect');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            element.classList.add('hovered');
        });
        
        element.addEventListener('mouseleave', () => {
            element.classList.remove('hovered');
        });
    });
    
    // 탭 기능 (존재하는 경우)
    const tabButtons = document.querySelectorAll('.tab-button');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.getAttribute('data-target');
            
            // 모든 탭 버튼 비활성화
            tabButtons.forEach(btn => btn.classList.remove('active'));
            
            // 클릭된 탭 버튼 활성화
            button.classList.add('active');
            
            // 모든 탭 콘텐츠 숨기기
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.add('hidden');
            });
            
            // 선택된 탭 콘텐츠 표시
            document.getElementById(targetId).classList.remove('hidden');
        });
    });
    
    // 스크롤 시 네비게이션 바 스타일 변경
    const nav = document.querySelector('nav');
    
    if (nav) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        });
    }
    
    // 스무스 스크롤 구현
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // 향상된 애니메이션 효과
    const pulseElements = document.querySelectorAll('.icon-pulse, .animate-pulse');
    
    // 무작위 시간 간격으로 펄스 애니메이션 적용
    pulseElements.forEach(element => {
        const randomDelay = Math.random() * 2;
        element.style.animationDelay = `${randomDelay}s`;
    });
    
    // 스크롤 진행 표시기 (페이지 맨 위에 진행률 표시)
    const progressBar = document.createElement('div');
    progressBar.classList.add('scroll-progress');
    progressBar.style.position = 'fixed';
    progressBar.style.top = '0';
    progressBar.style.left = '0';
    progressBar.style.height = '4px';
    progressBar.style.backgroundColor = '#10b981';
    progressBar.style.zIndex = '1000';
    progressBar.style.width = '0%';
    progressBar.style.transition = 'width 0.2s ease-out';
    document.body.appendChild(progressBar);
    
    // 스크롤 시 진행률 업데이트
    window.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercentage = (scrollTop / scrollHeight) * 100;
        
        progressBar.style.width = `${scrollPercentage}%`;
    });
});

// 구현 로드맵 이미지를 클릭하면 모달로 큰 이미지 보기
function showLargeImage(imgSrc, altText) {
    // 모달 컨테이너 생성
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    modal.style.display = 'flex';
    modal.style.alignItems = 'center';
    modal.style.justifyContent = 'center';
    modal.style.zIndex = '1050';
    modal.style.opacity = '0';
    modal.style.transition = 'opacity 0.3s ease';
    
    // 이미지 요소 생성
    const imgElement = document.createElement('img');
    imgElement.src = imgSrc;
    imgElement.alt = altText;
    imgElement.style.maxWidth = '90%';
    imgElement.style.maxHeight = '90%';
    imgElement.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    imgElement.style.transform = 'scale(0.9)';
    imgElement.style.transition = 'transform 0.3s ease';
    
    // 닫기 버튼 생성
    const closeButton = document.createElement('button');
    closeButton.innerHTML = '&times;';
    closeButton.style.position = 'absolute';
    closeButton.style.top = '20px';
    closeButton.style.right = '20px';
    closeButton.style.fontSize = '30px';
    closeButton.style.color = 'white';
    closeButton.style.backgroundColor = 'transparent';
    closeButton.style.border = 'none';
    closeButton.style.cursor = 'pointer';
    
    // 모달에 요소 추가
    modal.appendChild(imgElement);
    modal.appendChild(closeButton);
    document.body.appendChild(modal);
    
    // 애니메이션 적용을 위한 타임아웃
    setTimeout(() => {
        modal.style.opacity = '1';
        imgElement.style.transform = 'scale(1)';
    }, 10);
    
    // 닫기 버튼 이벤트 리스너
    closeButton.addEventListener('click', () => {
        modal.style.opacity = '0';
        imgElement.style.transform = 'scale(0.9)';
        
        setTimeout(() => {
            document.body.removeChild(modal);
        }, 300);
    });
    
    // 모달 영역 클릭 시 닫기
    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.opacity = '0';
            imgElement.style.transform = 'scale(0.9)';
            
            setTimeout(() => {
                document.body.removeChild(modal);
            }, 300);
        }
    });
}

// 모든 로드맵 SVG 이미지에 클릭 이벤트 추가
document.addEventListener('DOMContentLoaded', function() {
    const roadmapImages = document.querySelectorAll('.roadmap-image, [alt*="로드맵"], [alt*="다이어그램"]');
    
    roadmapImages.forEach(img => {
        img.style.cursor = 'pointer';
        img.title = '클릭하여 크게 보기';
        
        img.addEventListener('click', () => {
            showLargeImage(img.src, img.alt);
        });
    });
});
