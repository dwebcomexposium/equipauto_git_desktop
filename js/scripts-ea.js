;(function($, window, document, undefined) {
	var $win = $(window);
	var $doc = $(document);
	var winO, winW, winH;

	// Partners slider
	function initPartnerSlider($slider, isDual) {
		var $clone = $slider.clone();
		var sliders = isDual ? '<div class="pg-slider-container"/><div class="pg-slider-container"/>' : '<div class="pg-slider-container"/>';
		var items = $clone.find('.pg-item').length;

		$slider.after($clone);
		$slider.detach();

		$clone
			.find('.slider-content')
			.after(sliders);

		$clone
			.find('.pg-item')
			.each(function() {
				var $this = $(this);
				var $itemClone = $this.clone();
				var $container = $clone.find('.pg-slider-container');

				if ( isDual ) {
					$container = $this.index() + 1 <= items / 2 ? $container.eq(0) : $container.eq(1);
				};

				$itemClone.appendTo($container);
			});

		$clone
			.find('.slider-content')
			.detach();

		$('.pg-slider-container').each(function() {
			var $slidesContainer = $(this);

			$slidesContainer.show().carouFredSel({
				width: '100%',
				circular: true,
				infinite: true,
				responsive: true,
				auto: {
					play: true,
					timeoutDuration: 0
				},
				swipe: {
					onTouch: true
				},
				scroll: {
					duration: 40000,
					easing: 'linear'
				},
				items: {
					minimum: 1,
					visible: 5
				}
			});
		});
	};

	function countTo(container) {
        $(container).each(function() {
            var $this = $(this);
            var countFrom = parseInt($this.text(), 10);
            var countTo = parseInt($this.data('count'), 10);

            if (!$this.hasClass('counted')) {
                $({ Counter: countFrom }).animate({ Counter: countTo + 1 }, {
                    duration: 1500,
                    easing: 'swing',
                    step: function () {
                      $this.text(Math.floor(this.Counter).toLocaleString().replace(',', '.'));
                    }
                });
            }

            $this.addClass('counted');
        });
    };

	$doc.ready(function() {
		var $listArticlesLarge       = $('.list-articles.block-page');
		var $listArticlesSmall       = $('.front .list-articles.block-small .inside');
		var $newsletterForm          = $('.newsletter-form');
		var $newsletterField         = $('#comexposium_newsletter_email');
		var $newsletterLabel         = $('.nf-form-item label');
		var $smallArticlesTitle      = $listArticlesSmall.find('.block-title');
		var $seoTitle                = $('.block-page.edito .block-title');
		var $visitorsSlider          = $('.partner.visiteurs .partner-gallery');
		var $partnersSlider          = $('.partner:not(.visiteurs) .partner-gallery');
		var $youtubePlaylist         = $('#youmax');
		var $singleSlider            = $('.slider-single .slider-container');
		var $blockStats              = $('.block-stats');
		var $cta                     = $('.block.block-small.quicklinks.ctainterne');
		var $article                 = $('.article-wrapper .article-content');
		var $articleBq               = $article.find('blockquote');
		var searchPlaceholder    	 = $('html').attr('lang') === 'fr' ? 'Recherche, produit, exposant...' : 'Search, products, exhibitors...';

		winO = $win.scrollTop();
		winW = $win.width();
		winH = $win.height();

		$('.gsf-input-line input').attr('placeholder', searchPlaceholder);

		$win.off('scroll.navactive');

		$('.header-exhibitors').insertAfter($('.global-search-form'));

//		$('.header-slogan').insertBefore($('.header-socials'));

		$('.nf-main-content').append('<a href="#newsletter" class="newsletter-dismiss" />');

		$('[href="#newsletter"]')
			.removeAttr('onclick')
			.off('click')
			.on('click', function(event) {
				event.preventDefault();

				$newsletterForm.toggleClass('is-visible');
			});

		if ( $('.block-page.list-articles:not(.actus) .gla-item').length ) {
			$('.block-page.list-articles:not(.actus) .gla-item img').wrap('<div class="image"/>');
		}
		
		if ( $('.newsletter-form').length ) {
			$newsletterField.attr('placeholder', $newsletterLabel[0].innerHTML.replace(/\<(.*)/g, ''));
		}
						

		$seoTitle.html($seoTitle.text().replace(/- (.*)/m, '<strong>$1</strong>'));

		if ( $listArticlesLarge.length ) {
			$listArticlesLarge.append('<a href="#" class="slider-control-prev" />');
			$listArticlesLarge.append('<a href="#" class="slider-control-next" />');
		};

		if ($('.article-wrapper').length) {
			$('.article-wrapper h3').wrapInner('<span/>');
		};

	
		$smallArticlesTitle.html('En direct <strong>du blog</strong>');
		
		
		$('#one span').text('Hi I am replace');

		$listArticlesSmall.wrapInner('<div class="block-inner"></div>');
		$('.block-content').appendTo($listArticlesSmall);
		$listArticlesSmall.find('.block-inner').append('<div class="list-articles-slider-secondary" />').find('.la-item').each(function() {
			$(this).detach().appendTo($listArticlesSmall.find('.list-articles-slider-secondary'));
		});

		// Accordion 
		if ( $('.accordion').length ) {
			$('.accordion').each(function() {
				$(this).find('.accordion-section:eq(0) .accordion-body').slideDown();
			});

			$('.accordion-head').on('click', function() {
				var $accordionSection = $(this).closest('.accordion-section');
				
				$accordionSection.addClass('accordion-expanded').siblings().removeClass('accordion-expanded');
				$accordionSection.find('.accordion-body').slideDown();
				$accordionSection.siblings().find('.accordion-body').slideUp();
			});
		};		

		if ($('.article-wrapper').length) {
            $('.article-wrapper h3').wrapInner('<span/>');
        };

        if ( window.location.href.indexOf('#newsletter') >= 0 ) {
			$newsletterForm.addClass('is-visible');
		};

		$newsletterForm.on('click', function(event) {
			var $target = $(event.target);

			if ( !$target.closest('.nf-main-content').length ) {
				$newsletterForm.removeClass('is-visible');
			};
		});

		$('.sector').eq(0).addClass('hover');

		$('.sector').on('click', function(event) {
			var $sector = $(this);
			var $sectors = $sector.parent();

			$sector.toggleClass('hover').siblings().removeClass('hover');
		});

		$articleBq.each(function(){
			var $this = $(this);
			var html  = $this.html();

			$this.html('<div class="article-content-blockquote-t"></div><div class="article-content-blockquote-c">' + html + '</div><div class="article-content-blockquote-b"></div>');
		});

		$win
			.on('resize', function() {
				winW = $win.width();
				winH = $win.height();
			})
			.on('load scroll', function() {
				winO = $win.scrollTop();

				if ( $blockStats.length && ( winO + winH * 0.7 > $blockStats.offset().top) ) {
					countTo($blockStats.find('.stats-counter'));
				};

				if ( $cta.length ) {
					$cta.toggleClass('cta-fixed', winO >= winH / 2 - $cta.outerHeight() / 2 + 50);
				};
			})
			.on('load', function() {
				winW = $win.width();
				winH = $win.height();

				if ( $singleSlider.length ) {
					$singleSlider.closest('.slider-single').addClass('loaded');
					$singleSlider.show().carouFredSel({
						width: '100%',
						circular: true,
						infinite: true,
						responsive: true,
						auto: {
							play: true,
							timeoutDuration: 5000
						},
						swipe: {
							onTouch: true
						},
						scroll: {
							duration: 700,
							easing: 'linear'
						},
						prev: '.slider-single .slider-button-prev',
						next: '.slider-single .slider-button-next',
					});
				};

				if ( $listArticlesLarge.length ) {
					$listArticlesLarge.find('.la-slider')
						.removeClass('cxp-swiper')
						.detach()
						.removeAttr('style')
						.appendTo($listArticlesLarge)
						.find('.slider-content')
							.removeClass('swiper-wrapper')
							.removeAttr('style')
							.show()
							.carouFredSel({
								circular: true,
								infinite: true,
								responsive: true,
								align: 'left',
								prev: '.list-articles .slider-control-prev',
								next: '.list-articles .slider-control-next',
								scroll: {
									items: 1,
									fx: 'crossfade',
									duration: 700,
									onBefore: function(data) {
										data.items.visible.removeClass('fade-in');
									},
									onAfter: function(data) {
										data.items.visible.addClass('fade-in');
									}
								},
								auto: {
									play: false,
									timeoutDuration: 7000
								},
								swipe: {
									onTouch: true
								},
								onCreate: function(data) {
									$(this).closest('.la-slider').addClass('loaded');
									data.items.addClass('fade-in');
								}
							});
				};

				if ( $listArticlesSmall.find('.list-articles-slider-secondary').length ) {
					$listArticlesSmall.find('.list-articles-slider-secondary').show().carouFredSel({
						responsive: true,
						circular: true,
						infinite: true,
						direction: 'up',
						align: false,
						auto: {
							play: true,
							timeoutDuration: 5000
						},
						swipe: {
							onTouch: true
						}
					});
				};

				if ( $visitorsSlider.length ) {
					initPartnerSlider($('.partner.visiteurs .partner-gallery'), true);
				};

				if ( $partnersSlider.length ) {
					initPartnerSlider($('.partner:not(.visiteurs) .partner-gallery'), false);
				};

				setTimeout(function() {
					if ( $youtubePlaylist.length ) {					
						// Init Youtube Videos Slider
						$('#youmax').youmax({
							apiKey: 'AIzaSyCNbIqgoVrq7IPkHr_NBMquEXAFu9zv474',
							vimeoAccessToken: '',
							clientId: '438137961980-vlefbf8sgps4r5fqon9u92m93n0hc1pi.apps.googleusercontent.com',
							channel: '',
							youtube_playlist_videos: [{
								name: 'Videos',
								url: 'https://www.youtube.com/playlist?list=PLzuJYaI-bA8i4hn0iMnkJVytJEdxxX5GR',					
								selected: true
							}],
							loadMode: 'paginate-sides',
							loadButtonSize: 'small',
							hideHeader: true,
							hideNavigation: true,
							hideComments: true,
							maxResults: 4,
							tabStyle: 'wire',
							youmaxBackgroundColor: '#ffffff',
							maxContainerWidth: 1120,
							fourColumnThumbnailWidth: '21.429%',
							fourColumnThumbnailLeftRightMargin: '1.78%',
							videoProtocol: 'https:'
						});					
					};
				}, 3000);
			});
	});
})(jQuery, window, document);
