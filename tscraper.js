'use strict';
const fs        = require('fs');
const cheerio   = require('cheerio');
const request   = require('request');

const twitterUsername = process.argv[2];

if (twitterUsername) {

  const twitterUrl = 'http://twitter.com/' + twitterUsername;
  
  request(twitterUrl, function(error, response, html) {

    if (!error) {
      const $ = cheerio.load(html);
      const $wrapper = $('.ProfileHeaderCard');
      const $new = $('.ProfileNav');
      let name, username, bio, location, webpage, join_date, following, tweets, followers, likes;

      name        = $wrapper.find('.ProfileHeaderCard-name a').first().text();
      username    = $wrapper.find('.ProfileHeaderCard-screenname > a').first().text();
      bio         = $wrapper.find('.ProfileHeaderCard-bio').first().text();
      join_date   = $wrapper.find('.ProfileHeaderCard-joinDate .ProfileHeaderCard-joinDateText').first().text().replace('Joined','').substring(1);
      tweets      = $new.find('.ProfileNav-item--tweets .ProfileNav-value').first().text();
      following   = $new.find('.ProfileNav-item--following .ProfileNav-value').first().text();
      followers   = $new.find('.ProfileNav-item--followers .ProfileNav-value').first().text();
      likes       = $new.find('.ProfileNav-item--favorites .ProfileNav-value').first().text();
      
      const userData = {
        name: name,
        username: username,
        bio: bio,
        join_date: join_date,
        tweets:tweets,
        following: following,
        followers:followers,
        likes:likes
      };

      console.log(userData);
    }
  });
} else throw "No username was given";
