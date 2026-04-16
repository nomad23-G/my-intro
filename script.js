document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.feature-section');

    const handleScroll = () => {
        const viewportHeight = window.innerHeight;

        sections.forEach((section) => {
            const container = section.querySelector('.sticky-container');
            const bgImage = section.querySelector('.bg-image');
            const content = section.querySelector('.content-box');
            
            const rect = section.getBoundingClientRect();
            const sectionHeight = section.offsetHeight;
            
            // Calculate progress through the section (0 to 1)
            // Progress starts at 0 when the top of the section hits the viewport
            // and ends at 1 when the bottom of the section leaves the viewport.
            let progress = -rect.top / (sectionHeight - viewportHeight);
            progress = Math.max(0, Math.min(1, progress));

            // Dramatic Scaling of Background
            const scale = 1.1 - (progress * 0.1);
            bgImage.style.transform = `scale(${scale})`;

            // Opacity of Content (Enter from bottom, Stay center, Fade out)
            // High point of visibility is in the middle
            let opacity = 0;
            let translateY = 40;

            if (progress > 0.1 && progress < 0.9) {
                // Fade in
                opacity = (progress - 0.1) / 0.2;
                translateY = 40 * (1 - opacity);
                if (progress > 0.3) opacity = 1;
                
                // Fade out at end
                if (progress > 0.7) {
                    opacity = 1 - (progress - 0.7) / 0.2;
                }
            }

            content.style.opacity = Math.max(0, Math.min(1, opacity));
            content.style.transform = `translateY(${translateY}px)`;
            
            // Subtle Blur effect for background if near edges
            const blur = progress < 0.2 || progress > 0.8 ? (0.2 - progress) * 10 : 0;
            // bgImage.style.filter = `blur(${Math.max(0, blur)}px)`;
        });

        // Hero title scroll effect (fade out and scale down)
        const hero = document.querySelector('.stunning-hero');
        const heroInner = hero.querySelector('.hero-inner');
        const heroRect = hero.getBoundingClientRect();
        const heroProgress = Math.max(0, Math.min(1, -heroRect.top / viewportHeight));
        
        heroInner.style.opacity = 1 - heroProgress * 1.5;
        heroInner.style.transform = `scale(${1 - heroProgress * 0.2})`;
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call
});
