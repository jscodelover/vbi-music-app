# VBI Music App

- On landing page(/) [for listing all albumns] - I have used /albums api to get the albums list and when user clicks on any album it will fetch the songs of that particular album from /photos/{id} api end point. 

- As /photos/{id} api ending is not returning the data in correct format (i.e array) so the code will break if photos/{id} api return multiple records.

- using cookies to store playlist data.