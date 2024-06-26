var gulp = require('gulp')
var awspublish = require('gulp-awspublish')
var cloudfront = require('gulp-cloudfront-invalidate-aws-publish')
var parallelize = require('concurrent-transform')

// https://docs.aws.amazon.com/cli/latest/userguide/cli-environment.html

var config = {
  // Required
  params: {
    Bucket: process.env.AWS_BUCKET_NAME
  },
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    signatureVersion: 'v3'
  },

  // Optional
  deleteOldVersions: false, // NOT FOR PRODUCTION
  distribution: process.env.AWS_CLOUDFRONT, // CloudFront distribution ID
  region: process.env.AWS_DEFAULT_REGION,
  headers: {
    /*'Cache-Control': 'max-age=315360000, no-transform, public',*/
  },

  // Sensible Defaults - gitignore these Files and Dirs
  distDir: 'dist',
  indexRootPath: true,
  cacheFileName: '.awspublish',
  concurrentUploads: 10,
  wait: true // wait for CloudFront invalidation to complete (about 30-60 seconds)
}

gulp.task('deploy', function() {
  // create a new publisher using S3 options
  // http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#constructor-property
  var publisher = awspublish.create(config)

  var g = gulp.src('./' + config.distDir + '/**')
  // publisher will add Content-Length, Content-Type and headers specified above
  // If not specified it will set x-amz-acl to public-read by default
  g = g.pipe(
    parallelize(publisher.publish(config.headers), config.concurrentUploads)
  )

  // Invalidate CDN
  if (config.distribution) {
    console.log('Configured with CloudFront distribution')
    g = g.pipe(cloudfront(config))
  } else {
    console.log(
      'No CloudFront distribution configured - skipping CDN invalidation'
    )
  }

  // Delete removed files
  if (config.deleteOldVersions) g = g.pipe(publisher.sync())
  // create a cache file to speed up consecutive uploads
  g = g.pipe(publisher.cache())
  // print upload updates to console
  g = g.pipe(awspublish.reporter())
  return g
})
