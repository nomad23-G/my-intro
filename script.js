document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.feature-section');
    const heroInner = document.querySelector('.hero-inner');
    const galleryHeader = document.querySelector('.gallery-header');

    const handleScroll = () => {
        const viewportHeight = window.innerHeight;

        // Sticky Feature Sections logic
        sections.forEach((section) => {
            const bgImage = section.querySelector('.bg-image');
            const content = section.querySelector('.content-box');
            
            const rect = section.getBoundingClientRect();
            const sectionHeight = section.offsetHeight;
            
            let progress = -rect.top / (sectionHeight - viewportHeight);
            progress = Math.max(0, Math.min(1, progress));

            const scale = 1.1 - (progress * 0.1);
            bgImage.style.transform = `scale(${scale})`;

            let opacity = 0;
            let translateY = 60;

            if (progress > 0.05 && progress < 0.95) {
                opacity = (progress - 0.05) / 0.15;
                translateY = 60 * (1 - Math.min(1, opacity));
                if (progress > 0.2) opacity = 1;
                
                if (progress > 0.8) {
                    opacity = 1 - (progress - 0.8) / 0.15;
                }
            }

            content.style.opacity = Math.max(0, Math.min(1, opacity));
            content.style.transform = `translateY(${translateY}px)`;
        });

        // Hero title scroll effect
        const heroRect = document.querySelector('.stunning-hero').getBoundingClientRect();
        const heroProgress = Math.max(0, Math.min(1, -heroRect.top / viewportHeight));
        
        heroInner.style.opacity = 1 - heroProgress * 2;
        heroInner.style.transform = `scale(${1 - heroProgress * 0.1})`;

        // Gallery Header Reveal
        const galleryRect = document.querySelector('.interests-gallery').getBoundingClientRect();
        if (galleryRect.top < viewportHeight * 0.8) {
            galleryHeader.style.opacity = 1;
            galleryHeader.style.transform = 'translateY(0)';
        }
    };

    // Initial state for gallery header
    galleryHeader.style.opacity = 0;
    galleryHeader.style.transform = 'translateY(30px)';
    galleryHeader.style.transition = 'all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)';

    window.addEventListener('scroll', handleScroll);
    handleScroll();
});
