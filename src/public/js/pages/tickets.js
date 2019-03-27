/*
 *       .                             .o8                     oooo
 *    .o8                             "888                     `888
 *  .o888oo oooo d8b oooo  oooo   .oooo888   .ooooo.   .oooo.o  888  oooo
 *    888   `888""8P `888  `888  d88' `888  d88' `88b d88(  "8  888 .8P'
 *    888    888      888   888  888   888  888ooo888 `"Y88b.   888888.
 *    888 .  888      888   888  888   888  888    .o o.  )88b  888 `88b.
 *    "888" d888b     `V88V"V8P' `Y8bod88P" `Y8bod8P' 8""888P' o888o o888o
 *  ========================================================================
 *  Author:     Chris Brame
 *  Updated:    1/20/19 4:43 PM
 *  Copyright (c) 2014-2019. All rights reserved.
 */

define('pages/tickets', [
  'jquery',
  'modules/helpers',
  'velocity',
  'datatables',
  'dt_responsive',
  'dt_grouping',
  'dt_scroller',
  'history'
], function ($, helpers) {
  var ticketsPage = {}

  ticketsPage.init = function (callback) {
    $(document).ready(function () {
      var table = $('#ticketTable')
      table.dataTable({
        searching: false,
        bLengthChange: false,
        paging: false,
        iDisplayLength: 99999,
        bInfo: false,
        scrollY: '100%',
        columnDefs: [
          { width: '50px', targets: 0 },
          { width: '50px', targets: 1 },
          { width: '65px', targets: 2 },
          { width: '23%', targets: 3 },
          { width: '110px', targets: 4 }
        ],
        order: [[2, 'desc']],
        oLanguage: {
          sEmptyTable: 'No tickets to display.'
        }
      })

      helpers.resizeAll()

      $('#ticketTable tbody').on('click', 'td', function () {
        var i = $(this)
          .parents('tr')
          .attr('data-ticket')
        var j = $(this).find('input[type=checkbox]')
        if ($(j).length !== 0) {
          return true
        }

        History.pushState(null, 'Ticket - ' + i, '/tickets/' + i)
      })

      $('tr.overdue td').velocity(
        { backgroundColor: '#b71c1c', color: '#ffffff' },
        {
          loop: true,
          easing: [1],
          duration: 800
        }
      )

      if (typeof callback === 'function') {
        return callback()
      }
    })
  }

  return ticketsPage
})
