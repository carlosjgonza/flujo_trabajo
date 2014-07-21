$ = require 'jquery'

do fill = (item = 'Una de las más creativas obras de arte') ->
  $('.tagline').append "#{item}"
fill