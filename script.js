document.addEventListener('DOMContentLoaded', function() {
    // 모바일 메뉴 토글 기능
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // 계절별 이미지 전환 기능
    const seasonalContainer = document.querySelector('.seasonal-container');
    if (seasonalContainer) {
        const seasonImages = document.querySelectorAll('.season-image');
        let currentSeason = 0;
        
        // 초기 이미지 표시
        if (seasonImages.length > 0) {
            seasonImages[0].classList.add('opacity-100');
        }
        
        // 계절 이미지 자동 전환
        setInterval(() => {
            // 현재 이미지 숨기기
            seasonImages[currentSeason].classList.remove('opacity-100');
            seasonImages[currentSeason].classList.add('opacity-0');
            
            // 다음 이미지 인덱스 계산
            currentSeason = (currentSeason + 1) % seasonImages.length;
            
            // 다음 이미지 표시
            seasonImages[currentSeason].classList.remove('opacity-0');
            seasonImages[currentSeason].classList.add('opacity-100');
        }, 4000); // 4초마다 전환
    }

    // 스크롤 애니메이션
    const fadeElements = document.querySelectorAll('.fade-in');
    
    // 페이지 로드 시 초기 체크
    checkFade();
    
    // 스크롤 시 체크
    window.addEventListener('scroll', checkFade);
    
    function checkFade() {
        const triggerBottom = window.innerHeight * 0.8;
        
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < triggerBottom) {
                element.classList.add('active');
            }
        });
    }

    // 타임라인 애니메이션 (implementation.html의 실행 로드맵 섹션)
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    if (timelineItems.length > 0) {
        // 페이지 로드 시 초기 체크
        checkTimeline();
        
        // 스크롤 시 체크
        window.addEventListener('scroll', checkTimeline);
        
        function checkTimeline() {
            const triggerBottom = window.innerHeight * 0.8;
            
            timelineItems.forEach(item => {
                const itemTop = item.getBoundingClientRect().top;
                
                if (itemTop < triggerBottom) {
                    item.classList.add('active');
                }
            });
        }
    }

    // 탭 콘텐츠 기능 (문제점과 개선방안 페이지에서 사용 가능)
    const tabButtons = document.querySelectorAll('.tab-button');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 활성 탭 버튼 변경
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // 탭 콘텐츠 변경
            const targetId = button.getAttribute('data-target');
            const tabContents = document.querySelectorAll('.tab-content');
            
            tabContents.forEach(content => {
                content.classList.add('hidden');
            });
            
            document.getElementById(targetId).classList.remove('hidden');
        });
    });

// 통계 숫자 카운팅 애니메이션 (기대효과 페이지 등에서 사용 가능)
const counters = document.querySelectorAll('.counter');

if (counters.length > 0) {
    counters.forEach(counter => {
        const originalText = counter.innerText; // 예: "15%↑" 또는 "30분↑"
        const targetValueString = counter.getAttribute('data-target');

        // data-target 속성이 없거나 비어있으면 이 요소는 건너뜁니다.
        if (targetValueString === null || targetValueString.trim() === '') {
            console.error("'.counter' 요소에 'data-target' 속성이 없거나 비어있습니다:", counter);
            return; // 다음 counter 요소로 넘어감
        }

        const targetValue = parseInt(targetValueString);

        // targetValue가 숫자가 아니면 오류를 출력하고 건너뜁니다.
        if (isNaN(targetValue)) {
            console.error("'.counter' 요소의 'data-target' 속성 값이 올바른 숫자가 아닙니다:", counter);
            // NaN 문제를 방지하기 위해 원래 텍스트를 그대로 둡니다.
            return; 
        }

        // 단위 추출: 원래 텍스트에서 숫자, 점(.), 쉼표(,)를 모두 제거하고 남은 문자들 (양쪽 공백 제거)
        // 예: "15%↑" 에서 "%↑" 추출, "30분↑" 에서 "분↑" 추출, "50억원↑" 에서 "억원↑" 추출
        const unit = originalText.replace(/[0-9.,]/g, '').trim();

        const duration = 2000; // 애니메이션 지속 시간 (밀리초)
        // 목표값이 0인 경우 increment가 NaN 또는 Infinity가 될 수 있으므로 예외 처리
        const increment = (targetValue === 0) ? 0 : targetValue / (duration / 16); // 60fps 기준
        let current = 0;

        const updateCounter = () => {
            if (targetValue === 0) { // 목표값이 0이면 바로 0으로 설정하고 단위와 함께 표시 후 종료
                counter.innerText = targetValue + unit;
                return;
            }

            current += increment;

            // 증가 애니메이션일 경우 current < targetValue, 감소 애니메이션일 경우 current > targetValue
            if ((increment > 0 && current < targetValue) || (increment < 0 && current > targetValue)) {
                counter.innerText = Math.ceil(current) + unit; // 현재 값에 단위를 붙여서 표시
                requestAnimationFrame(updateCounter);
            } else {
                counter.innerText = targetValue + unit; // 최종 목표 값에 단위를 붙여서 표시
            }
        };

        // 요소가 화면에 나타날 때만 카운팅 시작
        const observer = new IntersectionObserver((entries, obs) => { // obs 추가
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // 애니메이션 시작 전에 0 또는 시작 값으로 설정 (선택 사항, 초기값 깜빡임 방지)
                    // counter.innerText = '0' + unit; // 0으로 시작하려면 주석 해제
                    updateCounter();
                    obs.unobserve(entry.target); // 한 번 실행 후 관찰 중지 (obs 사용)
                }
            });
        }, { threshold: 0.1 }); // 화면에 10% 보일 때 시작 (조금 더 빨리 시작하도록 수정)

        observer.observe(counter);
    });
}

    // 계절별 배경색 변경 (홈페이지 헤더 배경색을 계절에 맞게 변경)
    const heroSection = document.querySelector('.hero-section');
    
    if (heroSection) {
        const seasonColors = [
            'from-green-600 to-green-400', // 봄
            'from-blue-600 to-blue-400',   // 여름
            'from-orange-600 to-orange-400', // 가을
            'from-gray-600 to-gray-400'    // 겨울
        ];
        
        let currentSeasonIndex = 0;
        
        // 초기 배경색 설정
        heroSection.classList.add(seasonColors[currentSeasonIndex]);
        
        // 이미지 전환과 함께 배경색도 변경
        setInterval(() => {
            // 현재 배경색 제거
            heroSection.classList.remove(seasonColors[currentSeasonIndex]);
            
            // 다음 계절 인덱스 계산
            currentSeasonIndex = (currentSeasonIndex + 1) % seasonColors.length;
            
            // 새 배경색 적용
            heroSection.classList.add(seasonColors[currentSeasonIndex]);
        }, 4000); // 4초마다 전환 (이미지 전환과 동일한 시간)
    }

    // 스크롤 시 네비게이션 바 스타일 변경
    const nav = document.querySelector('nav');
    
    if (nav) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                nav.classList.add('scrolled');
                nav.classList.add('bg-opacity-90');
                nav.classList.add('backdrop-blur-sm');
            } else {
                nav.classList.remove('scrolled');
                nav.classList.remove('bg-opacity-90');
                nav.classList.remove('backdrop-blur-sm');
            }
        });
    }

    // 스무스 스크롤 (앵커 링크 클릭 시)
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
                
                // 모바일 메뉴가 열려있으면 닫기
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                }
            }
        });
    });

    // 버튼 호버 효과 강화
    const buttons = document.querySelectorAll('.hover-effect');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.classList.add('scale-105');
            button.classList.add('shadow-lg');
        });
        
        button.addEventListener('mouseleave', () => {
            button.classList.remove('scale-105');
            button.classList.remove('shadow-lg');
        });
    });
});

// 페이지 로드 후 추가 스타일 적용을 위한 클래스 추가
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // 페이지 로드 완료 후 트랜지션 효과 활성화
    setTimeout(() => {
        document.querySelectorAll('.transition-ready').forEach(element => {
            element.classList.add('transition-active');
        });
    }, 100);
});