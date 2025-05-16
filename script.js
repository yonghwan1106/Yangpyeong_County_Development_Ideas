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

    // 스크롤 애니메이션 향상
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in');
    
    // 페이지 로드 시 초기 체크
    checkAnimation();
    
    // 스크롤 시 체크
    window.addEventListener('scroll', checkAnimation);
    
    function checkAnimation() {
        const triggerBottom = window.innerHeight * 0.85;
        
        animatedElements.forEach(element => {
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

    // 인터랙티브 타임라인 세부정보 표시
    window.showTimelineDetail = function(phase) {
        const details = {
            1: {
                title: "1단계: 상품 기획 및 R&D (1~3개월)",
                content: `
                    <ul class="list-disc pl-5 space-y-2">
                        <li>시장 조사 및 벤치마킹</li>
                        <li>제품 컨셉 및 브랜드 전략 수립</li>
                        <li>계절별 레시피 개발 및 테스트</li>
                        <li>원재료 확보 계획 수립</li>
                        <li>초기 예산 집행 계획 수립</li>
                    </ul>
                    <div class="mt-4 pt-4 border-t border-blue-200">
                        <p class="text-blue-700 font-bold">핵심 성과물</p>
                        <p class="text-gray-700">제품 컨셉 및 기본 레시피 확정, 브랜드 전략 문서</p>
                    </div>
                `
            },
            2: {
                title: "2단계: 시제품 개발 및 테스트 (3~5개월)",
                content: `
                    <ul class="list-disc pl-5 space-y-2">
                        <li>계절별 시제품 제작 및 품평회 진행</li>
                        <li>패키지 디자인 개발 및 시안 제작</li>
                        <li>소비자 반응 조사 및 피드백 수집</li>
                        <li>원재료 공급 농가와의 계약 체결</li>
                        <li>품질 표준화 및 안전 관리 체계 구축</li>
                    </ul>
                    <div class="mt-4 pt-4 border-t border-green-200">
                        <p class="text-green-700 font-bold">핵심 성과물</p>
                        <p class="text-gray-700">최종 제품 확정, 패키지 디자인 완성, 소비자 테스트 결과</p>
                    </div>
                `
            },
            3: {
                title: "3단계: 브랜드 및 패키지 디자인 완성 (5~6개월)",
                content: `
                    <ul class="list-disc pl-5 space-y-2">
                        <li>브랜드 아이덴티티 최종 확정</li>
                        <li>친환경 패키지 디자인 및 제작</li>
                        <li>브랜드 스토리텔링 및 콘텐츠 개발</li>
                        <li>마케팅 전략 및 계획 수립</li>
                        <li>상표권 등록 및 지식재산권 확보</li>
                    </ul>
                    <div class="mt-4 pt-4 border-t border-purple-200">
                        <p class="text-purple-700 font-bold">핵심 성과물</p>
                        <p class="text-gray-700">브랜드 가이드라인, 패키지 디자인 생산 시안, 마케팅 플랜</p>
                    </div>
                `
            },
            4: {
                title: "4단계: 생산 시스템 구축 및 품질 관리 체계 확립 (6~8개월)",
                content: `
                    <ul class="list-disc pl-5 space-y-2">
                        <li>생산 시설 및 설비 구축/계약</li>
                        <li>생산 인력 채용 및 교육</li>
                        <li>품질 관리 시스템 구축</li>
                        <li>HACCP 인증 준비</li>
                        <li>공급망 관리 체계 확립</li>
                    </ul>
                    <div class="mt-4 pt-4 border-t border-yellow-200">
                        <p class="text-yellow-700 font-bold">핵심 성과물</p>
                        <p class="text-gray-700">생산 체계 완성, 품질 관리 매뉴얼, 생산 전문 인력 확보</p>
                    </div>
                `
            },
            5: {
                title: "5단계: 마케팅 계획 수립 및 홍보 자료 제작 (8~9개월)",
                content: `
                    <ul class="list-disc pl-5 space-y-2">
                        <li>SNS 채널 구축 및 콘텐츠 제작</li>
                        <li>홍보 영상 및 사진 촬영</li>
                        <li>온라인 및 오프라인 홍보물 제작</li>
                        <li>인플루언서 마케팅 계획 수립</li>
                        <li>론칭 이벤트 기획</li>
                    </ul>
                    <div class="mt-4 pt-4 border-t border-red-200">
                        <p class="text-red-700 font-bold">핵심 성과물</p>
                        <p class="text-gray-700">브랜드 SNS 채널, 홍보 콘텐츠, 마케팅 캠페인 계획</p>
                    </div>
                `
            },
            6: {
                title: "6단계: 관광지 및 유통 채널 구축 (9~10개월)",
                content: `
                    <ul class="list-disc pl-5 space-y-2">
                        <li>관광지 내 판매점 계약 및 설치</li>
                        <li>온라인 쇼핑몰 구축</li>
                        <li>주요 유통 채널 입점</li>
                        <li>물류 및 배송 시스템 구축</li>
                        <li>판매 인력 교육 및 매뉴얼 개발</li>
                    </ul>
                    <div class="mt-4 pt-4 border-t border-indigo-200">
                        <p class="text-indigo-700 font-bold">핵심 성과물</p>
                        <p class="text-gray-700">오프라인/온라인 판매망 구축, 물류 체계 확립</p>
                    </div>
                `
            },
            7: {
                title: "7단계: 시범 판매 및 피드백 수집, 개선 (10~12개월)",
                content: `
                    <ul class="list-disc pl-5 space-y-2">
                        <li>시범 판매 및 소비자 피드백 수집</li>
                        <li>제품 및 서비스 개선</li>
                        <li>론칭 이벤트 실행</li>
                        <li>판매 데이터 분석 및 전략 조정</li>
                        <li>사업 확장 계획 수립</li>
                    </ul>
                    <div class="mt-4 pt-4 border-t border-teal-200">
                        <p class="text-teal-700 font-bold">핵심 성과물</p>
                        <p class="text-gray-700">정식 출시, 초기 매출 데이터, 향후 확장 계획</p>
                    </div>
                `
            }
        };
        
        document.getElementById('timelineDetail').classList.remove('hidden');
        document.getElementById('timelineContent').innerHTML = `
            <h3 class="text-2xl font-bold text-green-700 mb-4">${details[phase].title}</h3>
            ${details[phase].content}
        `;
    };

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

    // 통계 숫자 카운팅 애니메이션
    function animateCounters() {
        const counters = document.querySelectorAll('.counter');
        const speed = 200; // 카운팅 속도(ms)
        
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const increment = target / speed;
            
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(() => animateCounters(), 1);
            } else {
                counter.innerText = target;
            }
        });
    }

    // 카운터 요소가 화면에 보일 때 애니메이션 시작
    const observerConfig = {
        threshold: 0.5,
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target.querySelector('.counter');
                if (counter) {
                    const startValue = 0;
                    const endValue = parseInt(counter.getAttribute('data-target'));
                    const duration = 1500;
                    
                    let startTime = null;
                    
                    function countUp(timestamp) {
                        if (!startTime) startTime = timestamp;
                        const progress = Math.min((timestamp - startTime) / duration, 1);
                        const currentValue = Math.floor(progress * (endValue - startValue) + startValue);
                        
                        counter.textContent = currentValue;
                        
                        if (progress < 1) {
                            requestAnimationFrame(countUp);
                        } else {
                            counter.textContent = endValue;
                        }
                    }
                    
                    requestAnimationFrame(countUp);
                }
                counterObserver.unobserve(entry.target);
            }
        });
    }, observerConfig);

    document.querySelectorAll('.stat-item').forEach(item => {
        counterObserver.observe(item);
    });

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

    // 예산 도넛 차트 초기화
    const budgetCtx = document.getElementById('budgetChart');
    if (budgetCtx) {
        const budgetChart = new Chart(budgetCtx, {
            type: 'doughnut',
            data: {
                labels: ['제품 R&D 및 품질 관리', '패키지 디자인 및 제작', '마케팅 및 홍보', '판매 인프라 구축'],
                datasets: [{
                    data: [30, 20, 30, 20],
                    backgroundColor: ['#10B981', '#3B82F6', '#F59E0B', '#8B5CF6'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                cutout: '70%',
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    }
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