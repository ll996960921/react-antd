import React, { Component } from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import App from './App'  //容器
import Admin from './admin' //容器
import Home from './pages/home'
import NoMath from './pages/nomatch'
import Buttons from './pages/ui/buttons'
import Modals from './pages/ui/modals'
import Loadings from './pages/ui/loadings'
import Notification from './pages/ui/notification'
import Messages from './pages/ui/messages'
import Tab from './pages/ui/tabs'
import Gallerys from './pages/ui/gallery'
import Carousels from './pages/ui/carousel'
import Login from './pages/form/login'
import Register from './pages/form/register'
import BasicTable from './pages/table/basicTable'
import HighTable from './pages/table/highTable'
import City from './pages/city'
import Order from './pages/order'
import Common from './common'  //容器
import Detail from './pages/order/detail'
import User from './pages/user'
import BikeMap from './pages/map'
import Bar from './pages/echarts/bar'
import Pie from './pages/echarts/pie'
import Line from './pages/echarts/line'
import RichText from './pages/rich'
import Permission from './pages/permission'

export default class IRouter extends Component {
  render() {
    return (
      <Router>
        <App>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/common" render={() =>
              <Common>
                <Route path="/common/order/detail/:orderId" component={Detail} />
              </Common>
            }/>
            <Route path="/" render={() =>
              <Admin>
                <Switch>
                  <Route path="/" exact component={Home} />
                  <Route path="/home" component={Home} />
                  <Route path="/ui/buttons" component={Buttons} />
                  <Route path="/ui/modals" component={Modals} />
                  <Route path="/ui/loadings" component={Loadings} />
                  <Route path="/ui/notification" component={Notification} />
                  <Route path="/ui/messages" component={Messages} />
                  <Route path="/ui/tabs" component={Tab} />
                  <Route path="/ui/gallery" component={Gallerys} />
                  <Route path="/ui/carousel" component={Carousels} />
                  <Route path="/form/login" component={Login} />
                  <Route path="/form/reg" component={Register} />
                  <Route path="/table/basic" component={BasicTable} />
                  <Route path="/table/high" component={HighTable} />
                  <Route path="/city" component={City} />
                  <Route path="/order" component={Order} />
                  <Route path="/user" component={User} />
                  <Route path="/bikeMap" component={BikeMap} />
                  <Route path="/charts/bar" component={Bar} />
                  <Route path="/charts/pie" component={Pie} />
                  <Route path="/charts/line" component={Line} />
                  <Route path="/rich" component={RichText} />
                  <Route path="/permission" component={Permission} />
                  <NoMath component={NoMath} />
                </Switch>
              </Admin>
            } />
          </Switch>
        </App>
      </Router>
    )
  }
}
