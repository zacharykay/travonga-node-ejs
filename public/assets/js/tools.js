//================== Variable Declarations =======================
//
//

// Variables for Menu Toggle and Mega Nav Menu
const hamburgerIcon = document.getElementById('nav-menu-mobile-icon');
const menu = document.getElementById('megaNavMenu');

// Sticky Menu
const navMenu = document.querySelector('#sticky-header');

//
//
//
//

//================================= Sitewide Mega Menu Nav ======================================
//
//

//========== Mobile Hamburger / Menu Toggle ===========

// * Toggle between showing and hiding the navigation menu links when the user clicks on the hamburger menu / bar icon
function menuToggle() {
	if (menu.style.display === 'flex') {
		menu.style.display = 'none';
	}
	else {
		menu.style.display = 'flex';
	}
}

hamburgerIcon.addEventListener('click', () => menuToggle());

//
//
//
//

//=========== Show / Hide Backdrop on Hover for Mega Menu =========
$(document).ready(function() {
	$('.menu-item').hover(
		function() {
			$('#menuBackdrop').show();
		},
		function() {
			$('#menuBackdrop').hide();
		}
	);
});

//
//
//
//

// ======================= Lazy Load Images Offscreen on Scroll ======================
//
//
//

// Event Listeners to Trigger Lazy Load

document.addEventListener('DOMContentLoaded', function() {
	let lazyImages = [].slice.call(document.querySelectorAll('img.lazy'));
	let active = false;

	const lazyLoad = function() {
		if (active === false) {
			active = true;

			setTimeout(function() {
				lazyImages.forEach(function(lazyImage) {
					if (
						lazyImage.getBoundingClientRect().top <= window.innerHeight &&
						lazyImage.getBoundingClientRect().bottom >= 0 &&
						getComputedStyle(lazyImage).display !== 'none'
					) {
						lazyImage.src = lazyImage.dataset.src;
						// lazyImage.srcset = lazyImage.dataset.srcset;
						lazyImage.classList.remove('lazy');

						lazyImages = lazyImages.filter(function(image) {
							return image !== lazyImage;
						});

						if (lazyImages.length === 0) {
							document.removeEventListener('scroll', lazyLoad);
							window.removeEventListener('resize', lazyLoad);
							window.removeEventListener('orientationchange', lazyLoad);
						}
					}
				});

				active = false;
			}, 200);
		}
	};

	document.addEventListener('scroll', lazyLoad);
	window.addEventListener('resize', lazyLoad);
	window.addEventListener('orientationchange', lazyLoad);
});

//
//
//
//

//============== Multiple Show More / Show Less Collapsible Tab Buttons ===============
//
//

let coll = document.getElementsByClassName('collapsible-content');
let i;

function readMore() {
	for (i = 0; i < coll.length; i++) {
		coll[i].addEventListener('click', function() {
			this.classList.toggle('active');
			let content = this.previousElementSibling;
			if (content.style.display === 'block' && this.innerHTML === 'Read Less...') {
				content.style.display = 'none';
				this.innerHTML = 'Read More...';
			}
			else {
				content.style.display = 'block';
				this.innerHTML = 'Read Less...';
			}
		});
	}
}

readMore();

//
//
//
//

//================== In-Page Navigation Menu Sticky Headers ==========================
//
//

if (navMenu) {
	// Calculate position of Top relative to Sticky Menu
	let sticky = navMenu.offsetTop;
	// Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
	function stickyPageNav() {
		// Get the offset position of the navbar
		let prevScrollpos = window.pageYOffset;
		{
			if (prevScrollpos >= sticky) {
				navMenu.classList.add('sticky');
			}
			else {
				navMenu.classList.remove('sticky');
			}
		}
	}
	// On Window Scroll Run Sticky Page Nav Function
	window.onscroll = function() {
		stickyPageNav();
	};
}

//
//
//
//

//============================ Tabs =============================================
//
//

function openTab(evt, tabName, tabSection) {
	// Declare all variables
	let i, tabcontent, tablinks;
	// Apply function to single tab section instead of entire document
	let tabsection = document.getElementById(tabSection);
	let activeClass = evt.target.classList.contains('active');

	if (!activeClass) {
		// Get all elements with class="tabcontent" and hide them
		tabcontent = tabsection.getElementsByClassName('tabcontent');
		for (i = 0; i < tabcontent.length; i++) {
			tabcontent[i].style.display = 'none';
		}

		// Get all elements with class="tablinks" and remove the class "active"
		tablinks = tabsection.getElementsByClassName('tablinks');
		for (i = 0; i < tablinks.length; i++) {
			tablinks[i].className = tablinks[i].className.replace(' active', '');
		}

		// Show the current tab, and add an "active" class to the button that opened the tab
		let currTab = document.getElementById(tabName);
		currTab.style.display = 'block';
		evt.currentTarget.className += ' active';
	}
	else {
		document.getElementById(tabName).style.display = 'none';
		evt.target.classList.remove('active');
	}
}
