$ = require 'jquery'

do fill = (item = 'La más creativa obra de arte') ->
  $('.tagline').append "#{item}"
fill