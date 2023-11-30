const navigation = () => {
  return [
    {
      title: 'Home',
      path: '/home',
      icon: 'tabler:smart-home',
    },
    {
      title: 'User',
      path: '/users',
      icon: 'tabler:user',
    },
    {
      title: 'Weekly Duch',
      path: '/weekly-duch',
      icon: 'tabler:text-wrap-disabled',
    },
    {
      title: 'Setup',
      icon: 'tabler:settings',
      children: [
        {
          title: 'Master Data',
          icon: 'tabler:layout-grid',
          path: '/masterdata',
        }
      ]
    }   
  ]
}

export default navigation
