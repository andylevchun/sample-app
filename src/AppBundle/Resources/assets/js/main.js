$(function () {

	var App = {};

	/**
	 * Notifications handler
	 */
	App.handleNotify = function () {
		var randomId = 'rewrwe21';
		var $notify = $('#notify');
		var $messages = $('#messages');

		$notify.click(function() {
		        var $randomElement = $('<div>').attr('id', randomId).text('test notification').hide();

		        $messages.append($randomElement);
		        $randomElement.fadeIn('slow').delay(1000).fadeOut('slow', function () {
		        	var $self = $(this);
		        	$self.remove();
		        });
		});
	};

	/**
	 * Scroll handler
	 */
	App.handleScroll = function () {
		var $window = $(window);
		var $header = $('header');
		var classSticky = 'header--sticky';

		$window.scroll(function () {
			if ($window.scrollTop() >= 100 && !$header.hasClass(classSticky)) {
				$header.addClass(classSticky);
			} else if ($window.scrollTop() < 100) {
				$header.removeClass(classSticky);
			}
		});
	};

	/**
	 * Navigation handler
	 */
	App.toggleNav = function () {
		var $navButton = $('.nav-mobile');
		var $nav = $('.nav');

		$navButton.click(function () {
			$nav.toggleClass('show');
		});
	};

	/**
	 * Add To Cart handler
	 */
	App.addToCart = function () {
		var $addToCart = $('#addtocart');
		var $cart = $('.cart');
		var cartValue = (window.sessionStorage && sessionStorage.getItem('cart')) ? sessionStorage.getItem('cart') : 0;

		$cart.text(cartValue);

		$addToCart.click(function () {
			$cart.text(++cartValue);
			sessionStorage.setItem('cart', cartValue);
		});
	};

	/**
	 * Form actions handler
	 */
	App.formValidation = function () {
		var $form = $('.form--validate');
		var $inputs = $form.find('input').not('[type=submit]');
		var $submit = $form.find('[type=submit]');
		var inputsLength = $inputs.length;

		$submit.attr('disabled', true);

		$inputs.on('keyup', function() {
			var $self = $(this);

			if ($.trim($self.val()).length && App.isFieldValid($self)) {
				$self.addClass('valid').removeClass('error');
			} else {
				$self.removeClass('valid').addClass('error');
			}

			if ( $form.find('.valid').length === inputsLength) {
				$submit.attr('disabled', false);
			} else {
				$submit.attr('disabled', true);
			}
		});
	};

	/**
	 * Basic form validation handler
	 */
	App.isFieldValid = function ($this) {
		var fieldType = $this.attr('type');
		var exp = {
			email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
			number: /^\d*$/,
			phone: /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
			letters: /^[a-zA-Z ]{2,60}$/
		};

		var CARD_DIGITS_LENGTH = 16;
		var CVC_DIGITS_LENGTH = 3;

		switch (fieldType) {
			case 'email':
				return exp.email.test( $.trim($this.val()) );

			case 'number':
				return exp.number.test( $.trim($this.val()) ) && ($.trim($this.val()).length === CARD_DIGITS_LENGTH);

			case 'tel': 
				return exp.phone.test( $.trim($this.val()) );
			
			case 'password':
				return exp.number.test( $.trim($this.val()) ) && ($.trim($this.val()).length === CVC_DIGITS_LENGTH);

			default:
				if (fieldType === 'text' && $this.hasClass('name')) {
					return exp.letters.test( $.trim($this.val()) );
				}

				return true;
		}
	};


	$(document).ready(function () {
		App.handleNotify();
		App.handleScroll();
		App.toggleNav();
		App.addToCart();

		if (document.location.pathname.match('cart')) {
			App.formValidation();
		}
	});

});