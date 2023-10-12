import Menubar from '../Navbar/Navbar'

function Home() {
  return (
    <div>
     <Menubar heading={'Home page'}/>
    
     <section class="pt-12 bg-light">
    <div class="container">
        <div class="row align-items-center">
            <div class="col-md-6" >
                <img
                    alt="..."
                    style={{maxHeight:700,width:900}}
                    class="img-fluid rounded-lg shadow-lg"
                    src="https://images.unsplash.com/photo-1555212697-194d092e3b8f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
                />
            </div>
            <div class="col-md-6" style={{marginTop:0}}>
                <div class="text-center">
                
                    <div class="text-pink p-3 d-inline-flex align-items-center justify-content-center rounded-circle bg-pink-300 mt-8">
                        <i class="fas fa-rocket fa-2x"></i>
                    </div>
                    <h1 class="mt-4 font-weight-bold">Home Page</h1>
                </div>
                <ul class="list-unstyled mt-4" style={{marginLeft:150}}>
                    <li class="py-2">
                        <div class="d-flex align-items-center">
                            <div>
                                <span class="small font-weight-bold rounded-circle text-pink bg-pink-200 mr-3">
                                    <i class="fas fa-fingerprint"></i>
                                </span>
                            </div>
                            <div>
                                <h4 class="text-muted">Carefully crafted components</h4>
                            </div>
                        </div>
                    </li>
                    <li class="py-2">
                        <div class="d-flex align-items-center">
                            <div>
                                <span class="small font-weight-bold rounded-circle text-pink bg-pink-200 mr-3">
                                    <i class="fab fa-html5"></i>
                                </span>
                            </div>
                            <div>
                                <h4 class="text-muted">Amazing page examples</h4>
                            </div>
                        </div>
                    </li>
                    <li class="py-2">
                        <div class="d-flex align-items-center">
                            <div>
                                <span class="small font-weight-bold rounded-circle text-pink bg-pink-200 mr-3">
                                    <i class="far fa-paper-plane"></i>
                                </span>
                            </div>
                            <div>
                            <h4 class="text-muted">Amazing page examples</h4>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
 
</section>

    </div>
  )
}
export default Home
