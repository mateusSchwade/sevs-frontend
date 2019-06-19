const proxy = [
    {
      context: '/sevs',
      target: 'http://localhost:8080',
      pathRewrite: {'^/sevs' : ''}
    }
  ];