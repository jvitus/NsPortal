define(['marionette','i18n'],
function(Marionette) {
	'use strict';

	return Marionette.LayoutView.extend({
		template: 'app/base/home/tpl/tpl-home.html',
		className: 'home-page ns-full-height animated',
		events: {
		},

		animateIn: function() {
			this.$el.removeClass('zoomOutDown');

			this.$el.addClass('zoomInDown');

			this.$el.animate(
				{ opacity: 1 },
				500,
				_.bind(this.trigger, this, 'animateIn')
			);
		},

		// Same as above, except this time we trigger 'animateOut'
		animateOut: function() {
			//this.$el.css({'position' : 'absolute'});
			this.$el.removeClass('zoomInUp');

			//this.$el.addClass('zoomOutDown');

			this.$el.animate(
				{ opacity : 0 },
				500,
				_.bind(this.trigger, this, 'animateOut')
			);
		},
		onShow : function(options) {
			this.$el.i18n();

			var popup = this.$el.find('#trackPopup');
			this.$el.find('#track').on('click', function(){
				popup.fadeIn('fast');
			})
			popup.find('#close').on('click', function(){
				popup.fadeOut('fast');
			});
			$(document).mouseup(function (e)
			{
				if (!popup.is(e.target) // if the target of the click isn't the container...
					&& popup.has(e.target).length === 0) // ... nor a descendant of the container
				{
					popup.fadeOut('fast');
				}
			});
		}
	});
});