# JessFlix "Serverless" Lambda@Edge Website

This serverless function is the *Frontend* Lambda function for the website https://www.jessflix.com - a completely serverless website in the cloud on AWS.

## What it does
Basically, two things: Connect to DynamoDB to get data, and output HTML using templates and components.

The templates and components are in their respective directories.

## A few prerequisites
You're welcome to use this code for your own site; but this function on its own won't do much. To get it to work, you'll need to do a few things:

1. You'll need to setup a cloudfront distro and set behaviors that will trigger this lambda function on *origin* request. This will allow the response to cache at the cloudfront edge, and will allow the site to perform faster.
2. You'll need a S3 bucket, or something for file storage. The logo images referenced by these templates are in S3.
3. You'll need your own dynamodb table with data. In the code you'll find an array of sample data, so you can see the structure of the data being queried. You'll also need to make sure the lambda function has read access to dynamodo via IAM polocies.
4. You'll need something in place that populates dynamodb with data; I used a seperate lambda function that gets content from YouTube, and stores it as page data in DynamoDB.

## The story

My wife, Jessica, has a youtube channel, https://youtube.com/jessflix , and it has a few videos started getting a good amount of views. So, I decided to help expand her presence by getting a website up and running. On the flipside, I didn't want Jess to have to constantly update her website with content every time she uploads a video.

With this in mind, I decided to make a few things:

1. A Lambda function that runs once a minute that gets all her content from Youtube (via the YouTube API), and store it in DynamoDB
2. That same function will store that data, along with an automatically generated URI string, written from the title
3. A *Lambda@Edge* function (this function) that gets the data from DynamoDB, and writes it out in two ways: a homepage list of videos, and a video page with an embedded player.

Essentially, everytime she uploads a video to her YouTube channel, within a minute of publishing it will be listed on her website, as well.

Because this is a Lambda@Edge function, I wanted to keep dependencies light and cold start times as fast as possible; so you'll find no frontend framework here, no Express.js, no third party dependencies outside AWS's sdk.

DynamoDB access is set using IAM policies.

## Serverless framework
I really only used the serverless framework to make deployment easy.
