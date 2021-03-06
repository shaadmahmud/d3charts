var chartview;

// Body view
var AppView = Backbone.View.extend({
  el: 'body',

  events: {
    'click .toggle-view-option': 'toggleView',
  },

  // Hide, show different charts
  toggleView: function(e) {
    // Prevent anchor tag behavior
    e.preventDefault()
    var target = e.target;

    // Call correct route to load chart
    var href = $(target).attr('href');
    Backbone.history.navigate(href, {trigger: true});

    // Google Analytics
    ga('send', 'event', project_name, 'Toggle view');
  },

  initialize: function() {
      // this.render();
  },

  render: function() {
  }
});

// Hash navigation
var AppRouter = Backbone.Router.extend({
  routes: {
    "": "loadChart",
    "*chart": "loadChart"
  },

  loadChart: function() {
    var hash = Backbone.history.getFragment();
    var hash_format = hash.replace('chart-','');

    // Select the correct toggle button on initial load
    if (chartview !== undefined) {
      chartview['options']['csv'] = 'data/' + hash_format + '.csv';
      chartview.render('refresh');

      if (hash_format === 'diabetes-er-visits') {
        chartview['options']['header'] = 'Diabetes ER visit rate (age-adjusted 100,000)';
      } else {
        chartview['options']['header'] = 'Diabetes hospitalization rate (age-adjusted 100,000)';
      }
      $('.chart-container h4').html(chartview['options']['header'])
    }

    // Change styles of toggle buttons
    $('#' + hash).addClass('selected');
    $('#' + hash).siblings().removeClass('selected');
  }
});

var approuter = new AppRouter();
var appview = new AppView();

// Fire up Backbone
Backbone.history.start();

// Call model, which sets values
// And calls view of new chart
var chart_rendered = new ChartModel();