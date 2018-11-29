const site = {
    initialize: function () {
        this.historyClick();
    },
    historyClick: function () {
        $('.bloc-histoire').on('click', function(event) {
            //const targetid = $(this).attr('data-remodal-target');
            //console.log('target: ' + targetid);
            //const inst = $('[data-remodal-id=]' + targetid);

            //console.log('Instance state: ' + inst.getState());
        });
    }
};

$(document).ready(function() {
    site.initialize();
});