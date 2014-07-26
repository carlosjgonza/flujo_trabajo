$ = require 'jquery'

do fill = (item = 'Las más creativa obra de arte') ->
  $('.tagline').append "#{item}"
fill