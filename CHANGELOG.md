# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [unreleased]
### Added
- Koa support
- Express support
- Now is possible add or remove custom log levels
- Property `code` in log object
- New log type: `katch.log.warn`, `katch.log.debug`, `katch.log.trace`, `katch.log.fatal`

### Changed
- In log object changed property `type` to `level`

## [0.1.1] - 2017-08-02
### Fixed
- Readme description

## [0.1.0] - 2017-08-02
### Added
- Now constructor return `this`
- Prefix options
- Humanize options
- Server log
    - Process info
- Browser log
    - User agent info

### Changed
- Server
    - Now default log folder is "logs" instead of "errors"
- Browser
    - Now all logs are saved in "katch" key of localStorage      

## [0.0.26] - 2017-08-02
### Fixed
- Empty configuration issue

## [0.0.25] - 2017-08-02
### Fixed
- Configuration
- Readme
- Test

## [0.0.24] - 2017-08-01
- First release