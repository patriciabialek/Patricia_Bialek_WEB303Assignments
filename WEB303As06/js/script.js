$(function() {
    $('.accordion').on('click', '.accordion-control',function(e){
        //default action stopped
        e.preventDefault();
        //open and close panels
        $(this)
        .next('.accordion-panel')
        .not(':animated')
        .slideToggle();
    });

    $('.tab-list').each(function() {
        //find lists of tabs
        let $this = $(this)
        //store this list
        let $tab = $this.find('li.active')
        //get the active li
        let $link = $tab.find('a')
        //get active panel
        let $panel = $($link.attr('href'));

        $this.on('click', '.tab-control', function(e) {
            //prevent link
            e.preventDefault();
            //store current link
            let $link = $(this);
            //get clicked tab
            let id = this.hash;

            //if not active
            if(id && !$link.parent().is('.active')){
                //make panel and 
                $panel.removeClass('active');
                //tab inactive
                $tab.removeClass('active');
                //make new panel and 
                $panel = $(id).addClass('active');
                //tab active
                $tab = $link.parent().addClass('active');
            }
        });
    });
  });
  