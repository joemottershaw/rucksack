'use strict';

/* =============================================================================================
   JUICE -> COMPONENTS -> DROPDOWN
   ============================================================================================= */

;((($, window, document, undefined) => {
    // Set the plugin name
    const pluginName = 'dropdown';

    // Set the plugin defaults
    const defaults = {
        animationIn: 'fadeInUpTiny',
        animationOut: 'fadeOutDownTiny'
    };

    /**
     * Constructor
     * @param  {element}  element  The target element
     * @param  {array}    options  The plugin options
     * @return {void}
     */
    function Plugin(element, options) {
        // Store the plugin defaults, element and settings
        this._defaults = defaults;
        this._name = pluginName;
        this.element = element;
        this.settings = $.extend({}, defaults, options);

        // Call the initialize function
        this.initialize();
    }

    // Avoid Plugin.prototype conflicts
    $.extend(Plugin.prototype, {
        /**
         * Initialize the plugin
         * @return {void}
         */
        initialize() {
            // Set the target element
            const $element = $(this.element);
            const $dropdown = $element.find('.dropdown');
            const $dropdownContent = $('.dropdown__content', $dropdown);

            // Store the settings to the dropdown data
            $dropdown.data({
                'animation-in': $element.data('animation-in') || this.settings.animationIn,
                'animation-out': $element.data('animation-out') || this.settings.animationOut
            });

            // Check if the dropdown does not have the megamenu modifier class
            if (!$dropdown.hasClass('dropdown--megamenu')) {
                // Check if the dropdown has the center modifier class
                if ($dropdown.hasClass('dropdown--center')) {
                    // Set the element width
                    const elementWidth = $element.outerWidth();

                    // Set the left margin inline style of the dropdown
                    $dropdown.css({
                        'margin-left': elementWidth / 2
                    });
                }

                // Check if the dropdown has the right modifier class
                if ($dropdown.hasClass('dropdown--right')) {
                    // Set the element width
                    const elementWidth = $element.outerWidth();

                    // Set the left margin inline style of the dropdown
                    $dropdown.css({
                        'margin-left': elementWidth
                    });
                }
            }

            // Check if the dropdown has the is hoverable state class and the html tag doesn't have the touch detection class
            if ($dropdown.hasClass('is-hoverable') && !$('html').hasClass('touch')) {
                // Add a mouse enter event handler on the dropdown container
                $element.on('mouseenter', (event) => {
                    // Set the dropdown element
                    const $dropdown = $(event.currentTarget).find('.dropdown');

                    // Show the dropdown
                    this.show($dropdown);
                });

                // Add a mouse leave event handler on the dropdown container
                $element.on('mouseleave', (event) => {
                    // Set the dropdown element
                    const $dropdown = $(event.currentTarget).find('.dropdown');

                    // Hide the dropdown
                    this.hide($dropdown);
                });
            }

            // Add a click event handler to show and hide the dropdown
            $element.on('click', '.js-dropdown-trigger', (event) => {
                // Set the dropdown element
                const $dropdown = $(event.currentTarget).next('.dropdown');

                // Check if the dropdown has the is active state hook class
                if (!$dropdown.hasClass('is-active')) {
                    // Show the dropdown
                    this.show($dropdown);
                } else {
                    // Hide the dropdown
                    this.hide($dropdown);
                }
            });

            // Add a focus out event handler to hide the dropdown
            $element.on('focusout', (event) => {
                // Set the current target, related target and dropdown elements
                const $current = $(event.currentTarget);
                const $related = $(event.relatedTarget);
                const $dropdown = $current.children('.dropdown');

                // Check if the related target element is not the dropdown container
                if (!$related.closest('.has-dropdown').is($current)) {
                    // Hide the dropdown
                    this.hide($dropdown);
                }
            });
        },

        /**
         * Show a dropdown
         * @param  {element}  $dropdown  The dropdown element
         * @return {void}
         */
        show($dropdown) {
            // Set the dropdown content element
            const $dropdownContent = $('.dropdown__content', $dropdown);

            // Toggle the is active state hook class on the dropdown
            $dropdown.addClass('is-active');

            // Add the animation in class to the dropdown content and check when the animation has ended
            $dropdownContent.addClass($dropdown.data('animation-in')).one('animationend', () => {
                // Remove the animation in class from the dropdown content
                $dropdownContent.removeClass($dropdown.data('animation-in'));
            });
        },

        /**
         * Hide a dropdown
         * @param  {element}  $dropdown  The dropdown element
         * @return {void}
         */
        hide($dropdown) {
            // Set the dropdown content element
            const $dropdownContent = $('.dropdown__content', $dropdown);

            // Add the animation out class to the dropdown content and check when the animation has ended
            $dropdownContent.addClass($dropdown.data('animation-out')).one('animationend', () => {
                // Remove the animation out class from the dropdown content
                $dropdownContent.removeClass($dropdown.data('animation-out'));

                // Remove the is active state hook class on the dropdown
                $dropdown.removeClass('is-active');
            });
        },
    });

    /**
     * Plugin wrapper around the constructor to prevent against multiple instantiations
     * @param  {array}   options  The plugin options
     * @return {element}          The target element
     */
    $.fn[pluginName] = function(options) {
        // Return each element
        return this.each(function() {
            // Check the plugin does not exist in the elements data
            if (!$.data(this, `plugin_${pluginName}`)) {
                // Create a new instance of the plugin and assign it to the elements data
                $.data(this, `plugin_${pluginName}`, new Plugin(this, options));
            }
        });
    };
}))(jQuery, window, document);
