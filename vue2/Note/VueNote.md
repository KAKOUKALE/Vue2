<a name="ymEF4"></a>
# vue基础知识和原理
![image.png](https://cdn.nlark.com/yuque/0/2023/png/32917541/1675409970136-6c2a1668-5b97-4d56-8ab7-3969e6501d6e.png#averageHue=%23f9f7f5&clientId=uf200efe1-0892-4&from=paste&height=241&id=ufa84dced&name=image.png&originHeight=241&originWidth=498&originalType=binary&ratio=1&rotation=0&showTitle=false&size=18796&status=done&style=none&taskId=u65f40a20-1501-4809-baf0-8af3acbe3f7&title=&width=498)<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/32917541/1675409983714-14c2637a-36c1-4ad3-af3a-05809cba1dac.png#averageHue=%23f7f5f4&clientId=uf200efe1-0892-4&from=paste&height=142&id=u3b16fb94&name=image.png&originHeight=142&originWidth=614&originalType=binary&ratio=1&rotation=0&showTitle=false&size=17065&status=done&style=none&taskId=u12764dfe-52e3-46e8-91a4-12814945f3a&title=&width=614)
<a name="c0ikV"></a>
## 初识Vue

- 想让Vue工作，就必须创建一个Vue实例，且要传入一个配置对象
- root容器里的代码依然符合html规范，只不过混入了一些特殊的Vue语法
- root容器里的代码被称为【Vue模板】
- Vue实例和容器是一一对应的
- 真实开发中只有一个Vue实例，并且会配合着组件一起使用
- {{xxx}}是Vue的语法：插值表达式，{{xxx}}可以读取到data中的所有属性
- 一旦data中的数据发生改变，那么页面中用到该数据的地方也会自动更新(Vue实现的响应式)
```javascript
<body>
    <div id="root">
        <!-- 插值语法 -->
        <h1>Hello!{{name}}</h1>
    </div>
</body>
<script src="./vue.js"></script>
<script>

    Vue.config.productionTip = false
    // 创建Vue实例
    new Vue({
        el: '#root', //el用于指定为当前Vue实例为哪个容器服务，值通常为css选择器字符串
        data: { //data中用于存储数据，数据供el所指定的容器去使用，值我们暂时先写成一个对象
            name: 'Leah'
        }
    })
</script>
```
<a name="oRqpR"></a>
## 模板语法
Vue模板语法有2大类:

- 插值语法：
   - 功能：用于解析标签体内容
   - 写法：{{xxx}}，xxx是js表达式，且可以直接读取到data中的所有属性
- 指令语法:
   - 功能：用于解析标签（包括：标签属性、标签体内容、绑定事件…）
   - 举例：v-bind:href=“xxx” 或 简写为 :href=“xxx”，xxx同样要写js表达式，且可以直接读取到data中的所有属性
```javascript
<div id="root">
        <h1>插值语法</h1>
        <h3>Hello!{{name}}</h3>
        <hr>
        <h1>指令语法</h1>
        <a v-bind:href="link.url" :hello="hello">点击前往{{link.name}}</a>
    </div>

    <script>
        Vue.config.productionTip = false

        new Vue({
            el: '#root',
            data: {
                name: 'Leah',
                link: {
                    name: '哔哩哔哩',
                    url:  'https://www.bilibili.com',
                },
                hello: 'Hello'
            }
        })
    </script>
```
<a name="EGFkL"></a>
## 数据绑定
Vue中有2种数据绑定的方式：

- 单向绑定(v-bind)：数据只能从data流向页面
- 双向绑定(v-model)：数据不仅能从data流向页面，还可以从页面流向data

注意：

- 双向绑定一般都应用在表单类元素上（如：input、select等）
- v-model:value 可以简写为 v-model，因为v-model默认收集的就是value值
```javascript
<div id="root">
        单向数据绑定：<input type="text" :value="data">
        <br>
        <br>
        双向数据绑定：<input type="text" v-model:value="data">
    </div>

    <script>
        Vue.config.productionTip = false
        new Vue({
            el: '#root',
            data: {
                data : '数据绑定中...'
            }
        })
    </script>
```
<a name="iPLdX"></a>
## el与data的两种写法
el有2种写法

- new Vue时候配置el属性
- 先创建Vue实例，随后再通过vm.$mount(‘#root’)指定el的值

data有2种写法

- 对象式
- 函数式

注意：由Vue管理的函数，一定不要写箭头函数，否则this就不再是Vue实例了
```javascript
  	<div id="root">
        <h1>Hello!{{name}}</h1>
    </div>

    <script>
        Vue.config.productionTip = false

        /* const v = new Vue({
            data: {
                name: 'Leah'
            }
        }) 
        v.$mount('#root')*/
        const v = new Vue({
            data: function() {
                console.log('******', this)//此处的this为Vue
                return {
                    name: 'Leah'
                }
            }
        })
        v.$mount('#root')
    </script>
```
<a name="FEsIs"></a>
## Vue中的MVVM

- M：模型(Model) ：data中的数据
- V：视图(View) ：模板代码
- VM：视图模型(ViewModel)：Vue实例

其中

- data中所有的属性，最后都出现在vm身上
- vm身上所有的属性及Vue原型身上的所有属性，在Vue模板中都可以直接使用
<a name="Nvj9S"></a>
## 数据代理
<a name="G5ua1"></a>
##### Object.defineProperty()
**Object.defineProperty**(obj, prop, descriptor)<br />obj：要定义属性的对象。<br />prop：要定义或修改的属性的名称<br />descriptor：要定义或修改的属性描述符<br />**属性标志**<br />对象属性（properties），除 **value** 外，还有三个特殊的特性（attributes），也就是所谓的“标志”

- writable — 如果为 true，则值可以被修改，否则它是只可读的
- enumerable — 如果为 true，则表示是可以遍历的，可以在for… .in Object.keys()中遍历出来
- configurable — 如果为 true，则此属性可以被删除，这些特性也可以被修改，否则不可以
```javascript
      	let g = 'female'
        let person = {
            name: 'Leah',
            age: 23
        }

        Object.defineProperty(person, 'gender', {
            // value: 'female',
            // enumerable: true,    //控制属性是否可以枚举，默认是false
            // writable: true,      //控制属性是否可以修改，默认是false
            // configurable: true,   //控制属性是否可以删除，默认是false

            //当有人读取person的gender属性时，get函数(getter)就会被调用，
          	// 且返回值就是gender的值
            get: function() {
                console.log('有人读取了gender属性')
                return g
            },
            // 当有人修改person的gender属性时，set函数(setter)就会被调用，
          	// 且收到修改的具体值
            set(val) {
                console.log('有人修改了gender属性，且值为', val)
                g = val
            }
        })
```
数据代理：通过一个对象代理对另一个对象中属性的操作（读/写）
```javascript
      	let obj = {x: 122}
        let obj2 = {y: 200}
        Object.defineProperty(obj2, 'x', {
            get() {
                return obj.x
            },
            set(val) {
                obj.x = val
            }
        })
```
<a name="hZAiT"></a>
##### Vue中的数据代理

- Vue中的数据代理：通过vm对象来代理data对象中属性的操作（读/写）
- Vue中数据代理的好处：更加方便的操作data中的数据
- 基本原理：
   - 通过Object.defineProperty()把data对象中所有属性添加到vm上。
   - 为每一个添加到vm上的属性，都指定一个getter/setter。
   - 在getter/setter内部去操作（读/写）data中对应的属性。

![](https://cdn.nlark.com/yuque/0/2022/png/1379492/1643033436297-5d2d61ec-ed69-4706-a98d-afdbd53b383d.png#averageHue=%23a7ad82&from=url&id=YhxUl&originHeight=971&originWidth=1729&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)
<a name="LUpBx"></a>
## 事件处理
事件的基本使用：

- 使用v-on:xxx 或 @xxx 绑定事件，其中xxx是事件名
- 事件的回调需要配置在methods对象中，最终会在vm上
- methods中配置的函数，都是被Vue所管理的函数，this的指向是vm 或 组件实例对象
- @click = "demo"和@click = "demo($event)"效果一致，但后者可以传参【鼠标移入、移出等】
```javascript
  	<div id="root">
        <h2>很高兴认识你！{{name}}</h2>
        <button v-on:click="interact">点我进行交互</button>
        <button @click="interactA($event, 6)">点我进行交互</button>
    </div>

    <script>
        Vue.config.productionTip = false

        new Vue({
            el: '#root',
            data: {
                name: 'Leah'
            },
            methods: {
                interact(event) {
                    // alert('我也很高兴认识你!Lisa')

                    // console.log(a, b, c, d) 
                    //PointerEvent {isTrusted: true,  …} undefined undefined undefined

                    console.log(event.target)
                    // <button>点我进行交互</button>

                    // console.log(this)    //Vue
                },
                interactA(event, val) {
                    console.log(event, val)
                    console.log(this)
                }
            }
        })
    </script>
```
**Vue中的事件修饰符**

- prevent：阻止默认事件（常用）
- stop：阻止事件冒泡（常用）
- once：事件只触发一次（常用）
- capture : 使用事件的捕获模式
- slef : 只有event.target是当前操作的原始时才触发事件
- passive : 事件的默认行为立即执行，无需等待事件回调执行完毕

修饰符可以连续写，比如：@click.prevent.stop = "showInfo"
<a name="QsWYI"></a>
## 键盘事件
> 键盘事件语法糖：@keydown，@keyup

Vue中常用的按键别名：

- 回车 => enter
- 删除 => delete
- 退出 => esc
- 空格 => space
- 换行 => tab (特殊，必须配合keydown去使用)
- 上 => up
- 下 => down
- 左 => left
- 右 => right

Vue未提供别名的按键，可以使用按键原始的key值去绑定，但注意要转为kebab-case<br />系统修饰键（用法特殊）ctrl alt shift meta

   - 配合keyup使用：按下修饰键的同时，再按下其他键，随后释放其他键，事件才被触发
      - 指定ctrl + y 使用：@keyup.ctrl.y
   - 配合keydown使用：正常触发事件
   - 也可以使用keyCode去指定具体的按键（不推荐）【keyCode已弃用】
   - Vue.config.keyCodes.自定义键名 = 键码 ，可以去定制按键别名
```bash
  	<div id="root">
        <h2>欢迎来到{{name}}学习</h2>
        <input type="text" placeholder="按下回车输出输入" @keyup.enter="showInput">
				<br>
        <input type="text" placeholder="按下tab输出输入" @keydown.tab="showInput">
				<br>
        <input type="text" placeholder="按下ctr+y输出输入" @keydown.ctrl.y="showInput">
				<br>
    </div>
    
    <script>
        Vue.config.productionTip = false

        new Vue({
            el: '#root',
            data: {
                name: 'B站大学'
            },
            methods: {
                showInput(e) {
                    // if(e.keyCode !== 13) return 
                    console.log(e.target.value)
                }
            }
        })
```
<a name="Ri8RV"></a>
## 计算属性

- 定义：要用的属性不存在，要通过已有属性计算得来
- 原理：底层借助了Objcet.defineProperty方法提供的getter和setter
- get函数什么时候执行？
   - 初次读取时会执行一次
   - 当依赖的数据发生改变时会被再次调用
- 优势：与methods实现相比，内部有缓存机制（复用），效率更高，调试方便
- 备注：
   - 计算属性最终会出现在vm上，直接读取使用即可
   - 如果计算属性要被修改，那必须写set函数去响应修改，且set中要引起计算时依赖的数据发生改变
```javascript
  	<div id="root">
        <div>姓：<input type="text" v-model="firstName" ></div><br> 
        <div>名：<input type="text" v-model="lastName"></div><br>
    <!--<div>全名：<span>{{firstName.slice(0, 3)}}{{lastName.slice(0, 3)}}</span></div>-->
        <div>全名：{{fullName}}</div>
    </div>

    <script>
        Vue.config.productionTip = false

        const vm = new Vue({
            el: '#root',
            data: {
                firstName: '张',
                lastName: '三',
            },
            /* methods: {
                fullName() {
                    return this.firstName + this.lastName
                }
            }, */
            computed: {

                // 完整写法
                /* fullName: {
                    //get有什么作用？当有人读取fullName时，get就会被调用，
                    	// 且返回值就作为fullName的值
                    //get什么时候调用？1.初次读取fullName时。2.所依赖的数据发生变化时。
                    get() {
                        return this.firstName + this.lastName
                    },
                    //set什么时候调用? 当fullName被修改时。
                     // 可以主动在控制台修改fullName来查看情况
                    set(val) {
                        console.log("修改了fullName属性！，" ,val)
                    }
                } */

                // 简写  只考虑读取不考虑修改才可以使用简写形式
                fullName() {
                    return this.firstName + this.lastName
                }
            }
        })
    </script>
```
<a name="R0cDs"></a>
## 监视属性/侦听属性
监视属性watch：

- 当被监视的属性变化时, 回调函数自动调用, 进行相关操作
- 监视的属性必须存在，才能进行监视
- 监视的两种写法：
   1. new Vue时传入watch配置
   2. 通过vm.$watch监视
```javascript
  	<div id="root">
        <h1>
            <div>今天很{{mood}}</div>
        </h1>
        <!-- @click里面可以写一些简单的语句 -->
        <!-- <button @click="isHappy = !isHappy">切换心情</button> -->
        <button @click="changeMood">切换心情</button>
    </div>

    <script>
        Vue.config.productionTip = false
        const vm = new Vue({
            el: '#root',
            data: {
                isHappy: true
            },
            computed: {
                mood() {
                    return this.isHappy ? '开心' : '伤心'
                }
            },
            methods: {
                changeMood() {
                    this.isHappy = !this.isHappy
                }
            },
            watch: {
                isHappy: {
                    // 初始化时调用一下handler
                    immediate: true,
                    // isHappy被修改了调用handler
                    handler(newVal, oldVal) {
                        console.log('isHappy被修改了', newVal, oldVal)
                    }
                },
                mood: {
                    handler(newVal, oldVal) {
                        console.log("mood的内容被修改了", newVal, oldVal)
                    }
                }
            }
        })
        /* vm.$watch('isHappy', {
            // 初始化时调用一下handler
            immediate: true,
            // isHappy被修改了调用handler
            handler(newVal, oldVal) {
                console.log('isHappy被修改了', newVal, oldVal)
            }
        }) */
    </script>
```
<a name="VPiZE"></a>
#### 深度监视：

- Vue中的watch默认不监测对象内部值的改变（一层）
- 配置deep:true可以监测对象内部值改变（多层）
- 注意：
   - Vue自身可以监测对象内部值的改变，但Vue提供的watch默认不可以
   - 使用watch时根据数据的具体结构，决定是否采用深度监视
```javascript
  	<div id="root">
        <h1>姓名：{{person.name}}</h1>
        <h1>年龄：{{person.age}}</h1>
        <h1>性别：{{person.gender}}</h1>
    </div>

    <script>
        Vue.config.productionTip = false
        const vm = new Vue({
            el: '#root',
            data: {
                person: {
                    name: 'Leah',
                    age: 23,
                    gender: 'femal'
                }
            },
            watch: {
                // person: {
                //     /* //监视多级结构中某个属性的变化
                //     'person.age': {
                //         handler() {
                //             console.log('person的age属性被修改了')
                //         }
                //     } */

                //     //监视多级结构中所有属性的变化
                //     deep: true,
                //     handler() {
                //         console.log('有人修改了person的信息')
                //     }
                // }

                // 简写形式
                'person.age'() {
                    console.log('person的age属性被修改了')
                }
            }
        })

       /*  vm.$watch('person.age', function(newVal, oldVal){
            console.log('person的age属性被修改了')
        }) */
    </script>
```
<a name="zzUec"></a>
#### computed和watch之间的区别：

- computed能完成的功能，watch都可以完成
- watch能完成的功能，computed不一定能完成，例如：watch可以进行异步操作

两个重要的小原则：

- 所被Vue管理的函数，最好写成普通函数，这样this的指向才是vm 或 组件实例对象
- 所有不被Vue所管理的函数（定时器的回调函数、ajax的回调函数等、Promise的回调函数），最好写成箭头函数，这样this的指向才是vm 或 组件实例对象，否则为window
<a name="nvLWZ"></a>
## 绑定样式
<a name="jTyo5"></a>
### **class样式**
写法：:class=“xxx” xxx可以是字符串、对象、数。<br />所以分为三种写法，字符串写法，数组写法，对象写法
```javascript
	<style>
    .basic {
        width: 200px;
        height: 50px;
        border: 3px solid #000;
    }
    .bfa {
        background-color: #bfa;
    }
    .pink {
        color: pink;
    }
    .orange {
        border-color: orange;
    }
</style>
<body>
    <div id="root">
        <!-- 绑定class样式--字符串写法，适用于：样式的类名不确定，需要动态指定 -->
        <div class="basic" :class="color" @click="bfa">
            Hello!{{name}}
        </div><br>
        <!-- 绑定class样式--数组写法，适用于：要绑定的样式个数不确定、名字也不确定 -->
        <div class="basic" :class="colorArr" @click="bfa">
            Hello!{{name}}
        </div><br>
        <!-- 绑定class样式--对象写法，适用于：要绑定的样式个数确定、名字也确定，
          		但要动态决定用不用 -->
        <div class="basic" :class="colorObj" @click="bfa">
            Hello!{{name}}
        </div>
    </div>

    <script>
        Vue.config.productionTip = false

        new Vue({
            el: '#root',
            data: {
                name: 'Leah',
                color: '',
                colorArr: ['bfa', 'pink', 'orange'],
                colorObj: {
                    bfa: false,
                    pink: false,
                    orange: false
                }
            },
            methods: {
                bfa() {
                    this.color = 'bfa'
                }
            }
        })
    </script>
</body>
```
![image.png](https://cdn.nlark.com/yuque/0/2023/png/32917541/1675497634170-14c7ae46-aa9d-46ab-b6ba-0ee40df671f3.png#averageHue=%23fcfcfb&clientId=u12333b2e-61cc-4&from=paste&height=493&id=u57c429a4&name=image.png&originHeight=663&originWidth=709&originalType=binary&ratio=1&rotation=0&showTitle=false&size=43837&status=done&style=none&taskId=u34b3f875-c812-4159-8e6a-7bd711abf1a&title=&width=527)
<a name="IPfL0"></a>
### **style样式**
有两种写法，对象写法，数组写法
```javascript
<style>
    .basic {
        width: 200px;
        height: 50px;
        border: 3px solid #000;
    }
</style>
<body>
    <div id="root">
        <div class="basic" :style="styleObj">
            Hello!{{name}}
        </div><br>
        <div class="basic" :style="styleArr">
            Hello!{{name}}
        </div><br>
    </div>

    <script>
        Vue.config.productionTip = false

        new Vue({
            el: '#root',
            data: {
                name: 'Leah',
                styleObj: {
                  // 注意驼峰式命名
                    backgroundColor: '#bfa',
                    color: 'blue'
                },
                styleArr: [
                    {
                        fontSize: '20px',
                        color: 'red'
                    },
                    {
                        backgroundColor: 'yellow',
                        borderColor: 'pink'
                    }
                ]
            },
            methods: {
                bfa() {
                    this.color = 'bfa'
                }
            }
        })
    </script>
</body>
```
<a name="nOXhi"></a>
## 条件渲染
<a name="ekfTR"></a>
### v-if

- 写法：
   1. v-if=“表达式”
   2. v-else-if=“表达式”
   3. v-else=“表达式”
- 适用于：切换频率较低的场景
- 特点：不展示的DOM元素直接被移除
- 注意：v-if可以和:v-else-if、v-else一起使用，但要求结构不能被“打断”
<a name="JrzTv"></a>
### **v-show**

- 写法：v-show=“表达式”
- 适用于：切换频率较高的场景
- 特点：不展示的DOM元素未被移除，仅仅是使用样式隐藏掉(display:none)
- 注：
   - 使用v-if的时，元素可能无法获取到，而使用v-show一定可以获取到
   - v-if 是实打实地改变dom元素，v-show 是隐藏或显示dom元素
- template标签不影响结构，页面html中不会有此标签，但只能配合v-if使用
```javascript
	<div id="root">
        <h2 v-show="true">欢迎来到 {{college}}！</h2>
        <h2 v-if="true">{{name}} 同学，欢迎你！</h2>
        <h4>n的值为：{{n}}</h4>
        <button @click="n++">Click</button>
        <h1 v-if="n===5">Frinday</h1>
        <h1 v-else-if="n===6">Saturday</h1>
        <h1 v-else-if="n===7">Sunday</h1>
        <h1 v-else>Today is a good day!</h1>

        <!-- v-if与template的配合使用 -->
        <template v-if="n===8">
            <h1>HTML</h1>
            <h1>CSS</h1>
            <h1>JavsScript</h1>
        </template>
    </div>
    
    <script>
        Vue.config.productionTip = false
        new Vue({
            el: '#root',
            data: {
                college: 'B站大学',
                name: 'Leah',
                n: 4
            }
        })
    </script>
```
<a name="DMmLL"></a>
## 列表渲染
<a name="qskue"></a>
### v-for指令

- 用于展示列表数据
- 语法：v-for=“(item, index) in xxx” :key=“yyy”
- 可遍历：数组、对象、字符串（用的很少）、指定次数（用的很少）
```javascript
	<div id="root">
        <h2>人员列表</h2>
        <ul>
            <!-- 遍历数组 -->
            <li v-for="(p, index) of persons" :key="">
                {{p.name}} --- {{p.age}}
                <!-- 马云 --- 40 -->
            </li>
            <!-- 遍历对象 -->
            <li v-for="(piece, k) of threePiece" :key="">
                {{k}}---{{piece}}
                <!-- HTML---html -->
            </li>
            <!-- 遍历字符串 -->
            <li v-for="(char, k,) of str" :key="">
                {{k}}---{{char}}
                <!-- 0---a -->
            </li>
            <!-- 遍历指定次数 -->
            <li v-for="(number, k) of 5">
                {{k}}---{{number}}
                <!-- 0---1 -->
            </li>
        </ul>
    </div>

    <script>
        Vue.config.productionTip = false

        new Vue({
            el: '#root',
            data: {
                persons: [
                    {id: '001', name: '马云', age: '40'},
                    {id: '002', name: '丁磊', age: '38'},
                    {id: '003', name: '马化腾', age: '35'},
                    {id: '004', name: '李彦宏', age: '54'},
                    {id: '005', name: '张一鸣', age: '41'},
                    {id: '005', name: '任正非', age: '56'}
                ],
                threePiece: {
                    HTML: 'html',
                    CSS: 'css',
                    JavaScript: 'javascript'
                },
                str: 'abcdefg'
            }
        })
    </script>
```
<a name="ceIGG"></a>
### **key的原理**
**虚拟DOM中key的作用**<br />key是虚拟DOM对象的标识，当数据发生变化时，Vue会根据【新数据】生成【新的虚拟DOM】, 随后Vue进行【新虚拟DOM】与【旧虚拟DOM】的差异比较，比较规则如下：

- 旧虚拟DOM中找到了与新虚拟DOM相同的key：
   - ①.若虚拟DOM中内容没变, 直接使用之前的真实DOM！
   - ②.若虚拟DOM中内容变了, 则生成新的真实DOM，随后替换掉页面中之前的真实DOM。
- 旧虚拟DOM中未找到与新虚拟DOM相同的key
   - 创建新的真实DOM，随后渲染到到页面。

**用index作为key可能会引发的问题：**

- 若对数据进行：逆序添加、逆序删除等破坏顺序操作：
   - 会产生没有必要的真实DOM更新 ==> 界面效果没问题, 但效率低。
- 如果结构中还包含输入类的DOM：
   - 会产生错误DOM更新 ==> 界面有问题。

**开发中如何选择key？**

- 最好使用每条数据的唯一标识作为key, 比如id、手机号、身份证号、学号等唯一值
- 如果不存在对数据的逆序添加、逆序删除等破坏顺序操作，仅用于渲染列表用于展示，使用index作为key是没有问题的

**了解vue中key的原理需要一些前置知识。**

- 就是vue的虚拟dom，vue会根据 data中的数据生成虚拟dom，如果是第一次生成页面，就将虚拟dom转成真实dom，在页面展示出来。
- 虚拟dom有啥用？每次vm._data 中的数据更改，都会触发生成新的虚拟dom，新的虚拟dom会跟旧的虚拟dom进行比较，如果有相同的，在生成真实dom时，这部分相同的就不需要重新生成，只需要将两者之间不同的dom转换成真实dom，再与原来的真实dom进行拼接。我的理解是虚拟dom就是起到了一个dom复用的作用，还有避免重复多余的操作。

**真实DOM和其解析流程**<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/32917541/1675516042684-a9df54c2-93fa-46b2-9ba8-8e0415770f1b.png#averageHue=%23dce183&clientId=u12333b2e-61cc-4&from=paste&id=u20c88e4e&name=image.png&originHeight=289&originWidth=624&originalType=url&ratio=1&rotation=0&showTitle=false&size=115395&status=done&style=none&taskId=u3ef55a58-de74-40a7-840e-428243723ec&title=)<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/32917541/1675516062386-149ca321-4b67-491d-a2c0-56652e076849.png#averageHue=%230d0d00&clientId=u12333b2e-61cc-4&from=paste&id=ua7957514&name=image.png&originHeight=289&originWidth=624&originalType=url&ratio=1&rotation=0&showTitle=false&size=46863&status=done&style=none&taskId=uf71c2fb0-aead-450c-964c-ed1a5127e51&title=)<br />所有的浏览器渲染引擎工作流程大致分为5步：创建 DOM 树 —> 创建 Style Rules -> 构建 Render 树 —> 布局 Layout -—> 绘制 Painting。

- 第一步，**构建 DOM 树**：当浏览器接收到来自服务器响应的HTML文档后，会遍历文档节点，生成DOM树。需要注意的是在DOM树生成的过程中有可能会被CSS和JS的加载执行阻塞，渲染阻塞下面会讲到。
- 第二步，**生成样式表**：用 CSS 分析器，分析 CSS 文件和元素上的 inline 样式，生成页面的样式表；
- 渲染阻塞：当浏览器遇到一个script标签时，DOM构建将暂停，直到脚本加载执行，然后继续构建DOM树。每次去执行Javascript脚本都会严重阻塞DOM树构建，如果JavaScript脚本还操作了CSSOM，而正好这个CSSOM没有下载和构建，那么浏览器甚至会延迟脚本执行和构建DOM，直到这个CSSOM的下载和构建。所以，script标签引入很重要，实际使用时可以遵循下面两个原则：
   - css优先：引入顺序上，css资源先于js资源
   - js后置：js代码放在底部，且js应尽量少影响DOM构建
> 还有一个小知识：当解析html时，会把新来的元素插入dom树里，同时去查找css，然后把对应的样式规则应用到元素上，查找样式表是按照从右到左的顺序匹配的例如：div p {…}，会先寻找所有p标签并判断它的父标签是否为div之后才决定要不要采用这个样式渲染。所以平时写css尽量用class或者id，不要过度层叠。

- 第三步，**构建渲染树**：通过DOM树和CSS规则我们可以构建渲染树。浏览器会从DOM树根节点开始遍历每个可见节点(注意是可见节点)对每个可见节点，找到其适配的CSS规则并应用。渲染树构建完后，每个节点都是可见节点并且都含有其内容和对应的规则的样式。这也是渲染树和DOM树最大的区别所在。渲染是用于显示，那些不可见的元素就不会在这棵树出现了。除此以外，display none的元素也不会被显示在这棵树里。visibility hidden的元素会出现在这棵树里。
- 第四步，**渲染布局**：布局阶段会从渲染树的根节点开始遍历，然后确定每个节点对象在页面上的确切大小与位置，布局阶段的输出是一个盒子模型，它会精确地捕获每个元素在屏幕内的确切位置与大小。
- 第五步，**渲染树绘制**：在绘制阶段，遍历渲染树，调用渲染器的paint()方法在屏幕上显示其内容。渲染树的绘制工作是由浏览器的UI后端组件完成的。

注意点：

1. **DOM 树的构建是文档加载完成开始的？** 
   - 构建 DOM 树是一个渐进过程，为达到更好的用户体验，渲染引擎会尽快将内容显示在屏幕上，它不必等到整个 HTML 文档解析完成之后才开始构建 render 树和布局。
2. **Render 树是 DOM 树和 CSS 样式表构建完毕后才开始构建的？** 
   - 这三个过程在实际进行的时候并不是完全独立的，而是会有交叉，会一边加载，一边解析，以及一边渲染。
3. **CSS 的解析注意点？**
   -  CSS 的解析是从右往左逆向解析的，嵌套标签越多，解析越慢。
4. **JS 操作真实 DOM 的代价？**
   - 传统DOM结构操作方式对性能的影响很大，原因是频繁操作DOM结构操作会引起页面的重排(reflow)和重绘(repaint)，浏览器不得不频繁地计算布局，重新排列和绘制页面元素，导致浏览器产生巨大的性能开销。直接操作真实DOM的性能特别差
<a name="irIMT"></a>
## vue 监测data 中的 数据
<a name="dUUTA"></a>
#### 更新时的一个问题
```javascript
  	<div id="root">
        <h2>人员列表</h2>
        <button @click="update">更新马冬梅的信息</button>
        <ul>
            <!-- 遍历数组 -->
            <li v-for="(p, index) of persons" :key="p.id">
                {{p.name}} --- {{p.age}}
            </li>
        </ul>
    </div>

    <script>
        Vue.config.productionTip = false

        new Vue({
            el: '#root',
            data: {
                persons: [
                    { id: '001', name: '马冬梅', age: 30, sex: '女' },
                    { id: '002', name: '周冬雨', age: 31, sex: '女' },
                    { id: '003', name: '周杰伦', age: 18, sex: '男' },
                    { id: '004', name: '温兆伦', age: 19, sex: '男' }
                ]
            },
            methods: {
                update() {
                    // 以下方式有效
                    /* this.persons[0].name = '马西梅'
                    this.persons[0].age = 34
                    this.persons[0].sex = '女' */
                    this.persons[0] = {id: '001', name: '马西梅', age: 34, sex: '女'}
                  //无效
                }
            }
        })
    </script>
```
<a name="uf82O"></a>
#### 模拟一个数据监测
```javascript
  	<script>
        let data = {
            name: 'Leah',
            age: 23
        }

        function Observer(obj) {
            // 汇总对象中所有的属性形成一个数组
            const keys = Object.keys(obj)
            /**
             * Object.keys()
             * 1） 处理对象，返回可枚举的所有可枚举属性的字符串数组
             * 2） 处理数组，返回索引值数组
             * 3） 处理字符串，返回索引值数组
             * 
             * Object.values()
             * Object.values()和Object.keys()是相反的操作，把一个对象的值转换为数组
            */
            // console.log(keys)
            // 遍历
            keys.forEach((k) => {
                Object.defineProperty(this, k, {
                    get() {
                        return obj[k]
                    },
                    set(val) {
                        console.log(`${k}被改了`)
                        obj[k] = val
                    }
                })
            })
        }

        // 创建一个监视的实例对象，用于监视data中属性的变化
        const obs = new Observer(data)
        console.log(obs)

        // 准备一个vm实例
        let vm = {}
        vm._data = data = obs
    </script>
```
<a name="Nhmtl"></a>
#### Vue.set 的使用

- Vue.set(target，propertyName/index，value) 
- vm.$set(target，propertyName/index，value)

用法<br />向响应式对象中添加一个 property，并确保这个新 property 同样是响应式的，且触发视图更新。它必须用于向响应式对象上添加新 property，因为 Vue 无法探测普通的新增 property 

- 比如 vm.myObject.newProperty = 'hi'

Vue.set() 或 vm.$set 有缺陷：

- 对象不能是Vue实例，或者Vue实例的根数据对象：就是 vm 和 _data
```javascript
  	<div id="root">
        <h2>姓名：{{name}}</h2>
        <h2>年龄：{{age}}</h2>
        <h2>学校：{{school.name}}</h2>
        <h2>学校地址：<a :href="school.address">{{school.address}}</a></h2>
        <h2 v-show="school.graduationTime">毕业时间：{{school.graduationTime}}</h2>
        <button @click="addGraTime">点击添加毕业时间</button>
        <hr>
        <h3>朋友</h3>
        <ul>
            <li v-for="(f, index) in friends" :key="index">
                {{f.name}}---{{f.age}}
            </li>
        </ul>
    </div>
    <script>
        Vue.config.productionTip = false

        new Vue({
            el: '#root',
            data: {
                name: 'Leah',
                age: 23,
                school: {
                    name: 'B站大学',
                    address: 'https://www.bilibili.com'
                },
                friends: [
                    { name: 'Lily', age: 23 },
                    { name: 'Nancy', age: 25 },
                    { name: 'Lisa', age: 30 }
                ]
            },
            methods: {
                addGraTime() {
                    Vue.set(this.school, 'graduationTime', '2023年')
                }
            }
        })

    </script>
```
**vue对数组的监测是通过 包装数组上常用的用于修改数组的方法来实现的。**<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/32917541/1675575594114-9e79c090-3839-4f8a-919f-4b20b0434334.png#averageHue=%23fdfdfc&clientId=u83439135-6555-4&from=paste&id=u42fd8c62&name=image.png&originHeight=450&originWidth=668&originalType=url&ratio=1&rotation=0&showTitle=false&size=37031&status=done&style=none&taskId=ucf224be1-36f1-4fc6-93cc-1035616c6fd&title=)
```javascript
  	<div id="root">
        <h2>姓名：{{name}}</h2>
        <h2>年龄：{{age}}</h2>
        <h2>学校：{{school.name}}</h2>
        <h2>学校地址：<a :href="school.address">{{school.address}}</a></h2>
        <button @click="addCourses">点击添加学习的课程</button>
        <h2 >学习课程：{{school.courses}}</h2>
        <button @click.once="addGraTime">点击添加毕业时间</button>
        <h2 v-show="school.graduationTime">毕业时间：{{school.graduationTime}}</h2>
        <hr>
        <h3>朋友</h3>
        <ul>
            <li v-for="(f, index) in friends" :key="index">
                {{f.name}}---{{f.age}}
            </li>
        </ul>
    </div>
    <script>
        Vue.config.productionTip = false

        new Vue({
            el: '#root',
            data: {
                name: 'Leah',
                age: 23,
                school: {
                    name: 'B站大学',
                    address: 'https://www.bilibili.com',
                    courses: ['HTML', 'CSS', 'JavaScript']
                },
                friends: [
                    { name: 'Lily', age: 23 },
                    { name: 'Nancy', age: 25 },
                    { name: 'Lisa', age: 30 }
                ]
            },
            methods: {
                addGraTime() {
                    Vue.set(this.school, 'graduationTime', '2023年')
                },
                addCourses() {
                    // Vue.set(this.school.courses, 3, 'Vue')
                    this.school.courses.push('Vue')
                }
            }
        })

    </script>
```
**总结：**<br />Vue监视数据的原理：

- vue会监视data中所有层次的数据
- 如何监测对象中的数据？

通过setter实现监视，且要在new Vue时就传入要监测的数据。

   - 对象中后追加的属性，Vue默认不做响应式处理
   - 如需给后添加的属性做响应式，请使用如下API：
      - Vue.set(target，propertyName/index，value)
      - vm.$set(target，propertyName/index，value)
- 如何监测数组中的数据？

通过包裹数组更新元素的方法实现，本质就是做了两件事：

   - 调用原生对应的方法对数组进行更新
   - 重新解析模板，进而更新页面
- 在Vue修改数组中的某个元素一定要用如下方法：
   - 使用这些API:push()、pop()、shift()、unshift()、splice()、sort()、reverse()
   - Vue.set() 或 vm.$set()
- 特别注意：Vue.set() 和 vm.$set() 不能给vm 或 vm的根数据对象 添加属性！
<a name="oU9cf"></a>
## 收集表单数据

- 若<input type="text"/>,则v-model收集的是value的值，用户输入的内容就是value值
- 若<input type='radio'/>,则v-model收集的是value的值，且要给标签配置value属性
- 若<input type='checkbox'/>
   - 没有配置value属性，那么收集的是checked属性（勾选or未勾选，是布尔值）
   - 配置了value属性
      - v-model的初始值是非数组，那么收集的就是checked（勾选or未勾选）
      - v-model的初始值是数组，那么收集的就是value组成的数组
- v-model的三个修饰符
   - lazy---失去焦点后再收集数据，懒加载
   - number---输入字符串转为有效的数字
   - trim---输入首位空格过滤
```javascript
  	<div id="root">
        <form @submit.prevent="submit">
            <!-- trim 去掉前后的空格 -->
            账号：<input type="text" v-model.trim="userInfo.account"><br><br>
            密码：<input type="password" v-model="userInfo.password"><br><br>
            <!-- 前一个number是控制输入框只能输入数字，后一个是数据类型为Number -->
            年龄：<input type="number" v-model.number="userInfo.age"><br><br>
            性别：
            男<input type="radio" name="gender" value="male" v-model="userInfo.gender">
            女<input type="radio" name="gender" value="female" v-model="userInfo.gender"><br><br>
            爱好：
            看电影<input type="checkbox" v-model="userInfo.hobby" value="movie">
            听音乐<input type="checkbox" v-model="userInfo.hobby" value="music">
            弹吉他<input type="checkbox" v-model="userInfo.hobby" v-model="hobby" value="guitar"><br><br>
            所属地区
            <select v-model="userInfo.address">
                <option value="">请选择地区</option>
                <option value="guangzhou">广州</option>
                <option value="shenzhen">深圳</option>
                <option value="chengdu">成都</option>
                <option value="nanjing">南京</option>
                <option value="nanchang">南昌</option>
            </select><br><br>
            其他信息
            <!-- lazy 懒加载 失去焦点一瞬间收集数据 而非实时收集数 -->
            <textarea cols="30" rows="10" v-model.lazy="userInfo.others"></textarea><br><br>
            <input type="checkbox" v-model="userInfo.agree">阅读并接受<a href="javascript:;">《用户协议》</a><br><br>
            <button>提交</button>
        </form>
    </div>

    <script>
        Vue.config.productionTip = false

        new Vue({
            el: "#root",
            data: {
                userInfo: {
                    account: '',
                    password: '',
                    age: "",
                    gender: 'female',
                    hobby: [],
                    address: 'guangzhou',
                    others: '',
                    agree: ''
                }
            },
            methods: {
                submit() {
                    console.log(JSON.stringify(this.userInfo))
                }
            }
        })
    </script>
```
<a name="d0Uh7"></a>
## 过滤器（vue3已移除）
定义：对要显示的数据进行特定格式化后再显示（适用于一些简单逻辑的处理）。<br />**语法：**

- 注册过滤器：Vue.filter(name,callback) 或 new Vue{filters:{}}
- 使用过滤器：{{ xxx | 过滤器名}} 或 v-bind:属性 = “xxx | 过滤器名”

注：

- 过滤器也可以接收额外参数、多个过滤器也可以串联
- 并没有改变原本的数据, 是产生新的对应的数据
```javascript
  	<div id="root">
        <h2>计算属性实现</h2>
        <h2>现在的时间是：{{fatTime}}</h2>
        <h2>methods方法是实现</h2>
        <h2>现在的时间是：{{getFmtTime()}}</h2>
        <h2>过滤器实现</h2>
        <h2>现在的时间是：{{time | timeFormater}}</h2>
        <!-- 过滤器接收参数 -->
        <h2>现在的时间是：{{time | timeFormater('YYYY_MM_DD')}}</h2>
        <!-- 上一个完成过滤之后将得到的值作为参数传到下一个过滤器里 -->
        <h2>现在的时间是：{{time | timeFormater('YYYY_MM_DD') | Myslice}}</h2>
        <!-- 过滤器只能在插值语法和v-bind里面使用 -->
        <h2 :x="aaa | Myslice">今天还可以吧</h2>
    </div>

    <script>
        Vue.config.productionTip = false
        // 全局过滤器
        Vue.filter('Myslice', function(value) {
            return value.slice(0, 4)
        })
         new Vue({
            el: '#root',
            data: {
                time: 1675586050051,//时间戳
                aaa: 'GoodDay'
            },
            computed: {
                fatTime() {
                    return dayjs(this.time).format('YYYY年MM月DD日 HH:mm:ss')
                }
            },
            methods: {
                getFmtTime() {
                    return dayjs(this.time).format('YYYY年MM月DD日 HH:mm:ss')
                }
            },
            filters: {
                timeFormater(value, str = 'YYYY年MM月DD日 HH:mm:ss') {
                    return dayjs(value).format(str)
                },
                Myslice(value) {
                    return value.slice(0, 4)
                }
            }
         })
    </script>
```
<a name="rwy3T"></a>
## 内置指令
![image.png](https://cdn.nlark.com/yuque/0/2023/png/32917541/1675588278881-0f91536b-705f-473d-8e7d-db447704fc5e.png#averageHue=%23f3f1ee&clientId=u83439135-6555-4&from=paste&height=238&id=uf477d5e1&name=image.png&originHeight=238&originWidth=410&originalType=binary&ratio=1&rotation=0&showTitle=false&size=26626&status=done&style=none&taskId=u31137b33-2298-4c9c-b027-27474b98c44&title=&width=410)<br />**v-text指令：**(使用的比较少)

- 作用：向其所在的节点中渲染文本内容。
- 与插值语法的区别：v-text会替换掉节点中的内容，{{xx}}则不会。
```javascript
  	<div id="root">
        <h1 v-text="str"></h1>
    </div>

    <script>
        Vue.config.procductionTip = false
        
        new Vue({
            el: '#root',
            data: {
                str: 'Hello!Leah!Fighting!!!'
            }
        })
    </script>
```
**v-html指令：**(使用的很少)

- 作用：向指定节点中渲染包含html结构的内容
- 与插值语法的区别：
   - v-html会替换掉节点中所有的内容，{{xx}}则不会。
   - v-html可以识别html结构。
- 严重注意：v-html有安全性问题！！！！
   - 在网站上动态渲染任意HTML是非常危险的，容易导致XSS攻击。
   - 一定要在可信的内容上使用v-html，永不要用在用户提交的内容上！
```javascript
  	<div id="root">
        <h1 v-html="str"></h1>
        
    </div>

    <script>
        Vue.config.procductionTip = false
        
        new Vue({
            el: '#root',
            data: {
                // XSS攻击  冒充用户之手
                str: '<h3>Hello!Leah!Fighting!!!</h3>'
            }
        })
    </script>
```
**v-cloak指令（没有值）：**

- 本质是一个特殊属性，Vue实例创建完毕并接管容器后，会删掉v-cloak属性。
- 使用css配合v-cloak可以解决网速慢时页面展示出{{xxx}}的问题
```javascript
<style>
    [v-clock] {
        display: none;
    }
</style>
<body>
    <div id="root">
        <h2 v-clock>{{name}}</h2>
        <!-- 延时5m的服务器 -->
        <script src="http://127.0.0.1:8080"></script>
    </div>

    <script>
        Vue.config.productionTip = false
        new Vue({
            el: '#root',
            data: {
                name: 'Leah'
            }
        })
    </script>
</body>
```
**v-once指令：**(用的少)

- v-once所在节点在初次动态渲染后，就视为静态内容了。
- 以后数据的改变不会引起v-once所在结构的更新，可以用于优化性能。

注意：事件修饰符里的once代表的是事件只响应一次，而v-once是模板初次渲染一次
```javascript
  	<div id="root">
        <h2 v-once>初始化后n的值为：{{n}}</h2>
        <h2>当前n的值为：{{n}}</h2>
        <button @click="n++">点击n++</button>
    </div>

    <script>
        Vue.config.productionTip = false
        new Vue({
            el: '#root',
            data: {
                n: 1
            }
        })
    </script>
```
**v-pre指令：**(比较没用)

- 跳过其所在节点的编译过程
- 可利用它跳过：没有使用指令语法、没有使用插值语法的节点，会加快编译
```javascript
  	<div id="root">
        <!-- 跳过其所在节点的编译过程 -->
        <h2 v-pre>Vue我也觉得不难</h2>
        <h2>当前n的值为：{{n}}</h2>
        <button @click="n++">点击n++</button>
    </div>

    <script>
        Vue.config.productionTip = false
        new Vue({
            el: '#root',
            data: {
                n: 1
            }
        })
    </script>
```
<a name="P4Wqr"></a>
## 自定义指令
![image.png](https://cdn.nlark.com/yuque/0/2023/png/32917541/1675606529012-2eb2305f-555d-4534-b72e-b4d1cce650c5.png#averageHue=%232f2e30&clientId=u718b0194-ccca-4&from=paste&height=561&id=u3f817fc3&name=image.png&originHeight=561&originWidth=1121&originalType=binary&ratio=1&rotation=0&showTitle=false&size=300526&status=done&style=none&taskId=u8a7b6ce3-4b07-4c02-b12f-56565c38362&title=&width=1121)
```javascript
  	<div id="root">
        <h2>当前n的值是：{{n}}</h2>
        <h2>放大10倍后n的值是：<span v-big="n"></span></h2>
        <button @click="n++">点我n+1</button><br><br>
        <input type="text" v-fbind:value="n">
    </div>

    <script>
        Vue.config.productionTip = false
        Vue.directive('fbind', {
            bind(element, binding) {
                element.value = binding.value
            },
            inserted(element, binding) {
                element.focus()
            },
            update(element, binding) {
                element.value = binding.value
                element.focus()
            }
        })
        new Vue({
            el: '#root',
            data: {
                n: 1
            },
            directives: {
                big(element, binding) {
                    // 此处的this是window
                    element.innerText = binding.value * 10
                },
                /* fbind: {
                    // 指令与元素成功绑定时调用
                    bind(element, binding) {
                        element.value = binding.value
                    },
                    // 指令所在元素被插入页面时调用
                    inserted(element, binding) {
                        element.focus()
                    },
                    // 指令所在的模板被重新解析时调用
                    update(element, binding) {
                        element.value = binding.value
                        element.focus()
                    }
                } */
            }
        })
    </script>
```
<a name="awEvD"></a>
## 生命周期
**引出声明周期**<br />生命周期

- 又名生命周期回调函数、生命周期函数、生命周期钩子
- 是什么：Vue在关键时刻帮我们调用的一些特殊名称的函数
- 生命周期函数的名字不可更改，但函数的具体内容是程序员根据需要编写的
- 生命周期函数中的this指向的是vm或组件实例对象
```javascript
  	<div id="root">
        <h2 :style="{opacity}">Hello! Leah</h2>
    </div>

    <script>
        Vue.config,productionTip = false

        new Vue({
            el: '#root',
            data: {
                opacity: 1
            },
            methods: {

            },
            // Vue完成模板的解析并把初始的真实DOM元素放入页面后（挂载完毕）调用 mounted
            mounted() {
                setInterval(() => {
                    this.opacity -= 0.01
                    if(this.opacity <= 0) this.opacity = 1
                }, 16)
            }
        })
    </script>
```
**beforeCreate（创建前）**：数据监测(getter和setter)和初始化事件还未开始，此时 data 的响应式追踪、event/watcher 都还没有被设置，也就是说不能访问到data、computed、watch、methods上的方法和数据。<br />**created（创建后）**：实例创建完成，实例上配置的 options 包括 data、computed、watch、methods 等都配置完成，但是此时渲染得节点还未挂载到 DOM，所以不能访问到 $el属性。<br />**beforeMount（挂载前）**：在挂载开始之前被调用，相关的render函数首次被调用。此阶段Vue开始解析模板，生成虚拟DOM存在内存中，还没有把虚拟DOM转换成真实DOM，插入页面中。所以网页不能显示解析好的内容。<br />**mounted（挂载后）**：在el被新创建的 vm.$el（就是真实DOM的拷贝）替换，并挂载到实例上去之后调用（将内存中的虚拟DOM转为真实DOM，真实DOM插入页面）。此时页面中呈现的是经过Vue编译的DOM，这时在这个钩子函数中对DOM的操作可以有效，但要尽量避免。一般在这个阶段进行：开启定时器，发送网络请求，订阅消息，绑定自定义事件等等<br />**beforeUpdate（更新前）**：响应式数据更新时调用，此时虽然响应式数据更新了，但是对应的真实 DOM 还没有被渲染（数据是新的，但页面是旧的，页面和数据没保持同步呢）。<br />**updated（更新后）** ：在由于数据更改导致的虚拟DOM重新渲染和打补丁之后调用。此时 DOM 已经根据响应式数据的变化更新了。调用时，组件 DOM已经更新，所以可以执行依赖于DOM的操作。然而在大多数情况下，应该避免在此期间更改状态，因为这可能会导致更新无限循环。该钩子在服务器端渲染期间不被调用。<br />**beforeDestroy（销毁前）**：实例销毁之前调用。这一步，实例仍然完全可用，this 仍能获取到实例。在这个阶段一般进行关闭定时器，取消订阅消息，解绑自定义事件。<br />**destroyed（销毁后）**：实例销毁后调用，调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。该钩子在服务端渲染期间不被调用<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/32917541/1675652785435-e80e0c83-4abd-4857-91cd-cd905fedaf39.png#averageHue=%23fbf9f8&clientId=uf8a79e35-e632-4&from=paste&id=ubff6854b&name=image.png&originHeight=1892&originWidth=1469&originalType=url&ratio=1&rotation=0&showTitle=false&size=441872&status=done&style=none&taskId=ubd7f4100-a3a5-4ac2-98d4-d8ed9bfae5f&title=)<br />**总结生命周期**<br />常用的生命周期钩子

- mounted 发送 ajax 请求、启动定时器、绑定自定义事件、订阅消息等初始化操作
- beforeDestory 清除定时器、解绑自定义事件、取消订阅消息等收尾工作

关于销毁Vue实例

- 销毁后借助Vue开发者工具看不到任何信息
- 销毁后自定义事件会失效，但原生DOM事件依然有效
- 一般不会在beforeDestory操作数据，因为即便操作数据，也不会再触发更新流程了
```javascript
  	<div id="root">
        <h2 v-text="n"></h2>
        <h2>当前n的值是：{{n}}</h2>
        <button @click="add">点我n+1</button>
        <button @click="bye">点我销毁vm</button>
    </div>

    <script>
        Vue.config.productionTip = false
        new Vue({
            el: '#root',
            data: {
                n: 1
            },
            methods: {
                add() {
                    this.n++
                    console.log('add')
                },
                bye() {
                    console.log('bye')
                    this.$destroy()
                }
            },
            watch: {
                n() {
                    console.log('n变了')
                }
            },
            beforeCreate() {
                console.log('beforeCreate')
                // console.log(this)
                //此时的Vue还没有进行数据代理，无法通过vm访问到data中的数据和methods的方法
                // debugger
            },
            // 初始化：数据监测、数据代理
            created() {
                // 此时：可以通过vm访问到data中的数据、methods中配置的方法
                console.log('created')
                // console.log(this)
                // debugger
            },
            // 此阶段Vue开始解析模板，生成虚拟DOM（内存中），页面还不能显示解析好的内容
            beforeMount() {
                console.log('beforeMount')
                // console.log(this)
                // debugger
                // 此时页面呈现的是未经Vue编译的DOM结构，对所有的DOM事件操作最终都不奏效
            },
            // 将内存中的虚拟DOM转为真实DOM插入页面
            mounted() {
                console.log('mounted')
                console.log(this)
                // debugger
                /* 此时页面中呈现的是经过Vue编译的DOM
                对DOM的操作均有效，（尽可能避免），至此初始化过程结束，
                一般在此进行：
                    开启定时器、发送网络请求、订阅消息、绑定自定义事件等初始化操作 */
            },
            beforeUpdate() {
                console.log('beforeUpdate')
                console.log(this.n)
                // debugger
                // 此时数据是新的，但页面是旧的，即页面尚未和数据保持同步
            },
            // 根据新数据，生成新的虚拟DOM，随后与旧的虚拟DOM进行比较，
            // 最终完成页面更新，即：完成了Model->View的更新
            updated() {
                console.log('updated')
                // debugger
                // 此时数据是新的，页面也是新的，即：页面和数据保持同步
            },
            beforeDestroy() {
                console.log('beforeDestory')
                /* 此时vm中所有的data、methods、指令等等，都处于可用状态，
                马上要执行销毁过程，一般在此阶段：
                    关闭定时器，取消订阅消息、解绑自定义事件等收尾操作 */
                
            },
            destoryed() {
                console.log('destory')
            }
        })
    </script>
```
<a name="DJB24"></a>
## 非单文件组件
**模块**

- 理解：向外提供特定功能的js文件，一般就是一个js文件
- 为什么：js文件很多很复杂
- 作用：复用、简化js的编写、提高js运行效率

**组件**

- 定义：用来实现局部功能的代码和资源的集合
- 为什么：一个界面的功能很复杂
- 作用：复用编码，简化项目编码，提高运行效率

**模块化**

- 当应用中的js都以模块来编写的，那这个应用就是一个模块化的应用

**组件化**

- 当应用总的功能都是组件方式来编写的，那这个应用就是一个组件化的应用
<a name="keEvm"></a>
### 基本使用
Vue中使用组件的三大步骤：

- 定义组件(创建组件)
- 注册组件
- 使用组件(写组件标签)

**1.定义组件**<br />使用Vue.extend(options)创建，其中options和new Vue(options)时传入的那个options几乎一样，但也有点区别,区别如下：

- el不要写，为什么？ ——最终所有的组件都要经过一个vm的管理，由vm中的el决定服务哪个容器。
- data必须写成函数，为什么？ ——避免组件被复用时，数据存在引用关系。

**2.注册组件**

- 局部注册：靠new Vue的时候传入components选项
- 全局注册：靠Vue.component(‘组件名’,组件)

**3.使用组件**<br />编写组件标签如<school></school>
```javascript
  	<div id="root">
        <student></student>
        <hr>
        <school></school>
    </div>
    <script>
        Vue.config.productionTip = false
        // 第一步：创建组件
        // 定义student组件
        const student = Vue.extend({
            template: `
            <div>
                <h2>姓名：{{name}}</h2>
                <h2>年龄：{{age}}</h2>
                <button @click='alertName'>点击弹出姓名</button>    
            </div>`,
            data() {
                // 组件里面不要写el配置，因为最终所有的组件都要被一个vm管理
                return {
                    name: 'Leah',
                    age: 23
                }
            },
            methods: {
                alertName() {
                    alert(this.name)
                }
            }
        })
        // 创建school组件
        const school = Vue.extend({
            template: `
            <div>
                <h2>学校：{{name}}</h2>
                <h2>学校地址：{{address}}</h2>
            </div>`,
            data() {
                return {
                    name: 'B站大学',
                    address: '哔哩哔哩网站'
                }
            }
        })
        // 全局注册组件
        Vue.components('hello', hello)
        new Vue({
            el: '#root',
            // 第二步：注册组件
            // 注册组件(局部注册)
            components: {
                school,
                student
            }
        })
    </script>
```
<a name="vc1k2"></a>
### **几个注意点：**
关于组件名：

- 一个单词组成
   - 第一种写法(首字母小写)：school
   - 第二种写法(首字母大写)：School
- 多个单词组成：
   - 第一种写法(kebab-case命名)：my-school
   - 第二种写法(CamelCase命名)：MySchool (需要Vue脚手架支持)
- 注意：
   - 组件名尽可能回避HTML中已有的元素名称，例如：h2、H2都不行。
   - 可以使用name配置项指定组件在开发者工具中呈现的名字。

关于组件标签：

- 第一种写法：<school></school>
- 第二种写法：<school/>(需要Vue脚手架支持)

一个简写方式：const school = Vue.extend(options) 可简写为：const school = options
<a name="n6okh"></a>
### 组件的嵌套
```javascript
  	<div id="root">
        <app></app>
    </div>

    <script>
        Vue.config.productionTip = false
        // 定义组件
        const school = Vue.extend({
            name: 'school',
            template: `
            <div>
                <h2>学校：{{name}}</h2>
                <h2>地址：{{address}}</h2>
            </div>`,
            data() {
                return {
                    name: 'school',
                    address: '哔哩哔哩'
                }
            }
        })
        const student = Vue.extend({
            name: 'student',
            template: `
            <div>
                <h2>姓名：{{name}}</h2>
                <h2>年龄：{{age}}</h2>
                <school></school>
            </div>`,
            data() {
                return {
                    name: 'Leah',
                    age: 23
                }
            },
            components: {
                school
            }
        })
        const sayHello = Vue.extend({
            name: 'sayHello',
            template: `
            <div>
            <hr>
            <h2>{{hello}}</h2>
            </div>`,
            data() {
                return {
                    hello: 'Hello! My name is Leah.'
                }
            }
        })
        const app = Vue.extend({
            name: 'app',
            template: `
            <div>
                <student></student>
                <sayHello></sayHello>    
            </div>`,
            components: {
                student,
                sayHello
            }
        })
        new Vue({
            el: "#root",
            template: `<app></app>`,
            components: {
                app
            }
        })
    </script>
```
<a name="gc38H"></a>
### VueComponent

- school组件本质是一个名为VueComponent的构造函数，且不是程序员定义的，是Vue.extend生成的。
- 我们只需要写，Vue解析时会帮我们创建school组件的实例对象，即Vue帮我们执行的：new VueComponent(options)。
- 特别注意：每次调用Vue.extend，返回的都是一个全新的VueComponent！！！！(这个VueComponent可不是实例对象)
- 关于this指向：
   - 组件配置中：data函数、methods中的函数、watch中的函数、computed中的函数 它们的this均是【VueComponent实例对象】。
   - new Vue(options)配置中：data函数、methods中的函数、watch中的函数、computed中的函数 它们的this均是【Vue实例对象】。
- VueComponent的实例对象，以后简称vc（也可称之为：组件实例对象）。Vue的实例对象，以后简称vm。

![image.png](https://cdn.nlark.com/yuque/0/2023/png/32917541/1675678606292-661c05ab-7e41-43af-b38d-53d59d42a6dd.png#averageHue=%23eecd94&clientId=u4b0902ab-8446-4&from=paste&id=ude0fc4db&name=image.png&originHeight=210&originWidth=960&originalType=url&ratio=1&rotation=0&showTitle=false&size=38623&status=done&style=none&taskId=u6ffabd14-1b95-4a4e-977d-7cc151209a8&title=)
<a name="UPIU6"></a>
### 一个重要的内置关系

- 一个重要的内置关系：VueComponent.prototype.__proto__ === Vue.prototype
- 为什么要有这个关系：让组件实例对象（vc）可以访问到 Vue原型上的属性、方法。

![image.png](https://cdn.nlark.com/yuque/0/2023/png/32917541/1675684329312-b900eb40-fc6c-44ab-819e-eb188c192ef1.png#averageHue=%23524e48&clientId=u4b0902ab-8446-4&from=paste&id=u88813bc1&name=image.png&originHeight=670&originWidth=1079&originalType=url&ratio=1&rotation=0&showTitle=false&size=369004&status=done&style=none&taskId=u815ddc7b-b00b-411e-a8a6-ae294756535&title=)
<a name="Z1xnV"></a>
## 单文件组件
```javascript
<template>
  <div>
    <h2>学校：{{ name }}</h2>
    <h2>学校地址：{{ address }}</h2>
  </div>
</template>

<script>
export default {
    name: 'School',
  data() {
    return {
      name: "B站大学",
      address: "哔哩哔哩网站",
    };
  },
};
</script>

<style >
/* 组件的样式 */
</style>
```
```javascript
<template>
  <div>
    <h2>姓名：{{ name }}</h2>
    <h2>年龄：{{ age }}</h2>
    <button @click="alertName">点击弹出姓名</button>
  </div>
</template>

<script>
export default {
    name: 'Student',
  data() {
    return {
      name: "Leah",
      age: 23,
    };
  },
  methods: {
    alertName() {
      alert(this.name);
    },
  },
};
</script>
```
```javascript
<template>
    <div>
        <Student></Student>
        <School></School>
    </div>
</template>

<script>
import Student from './Student.vue'
import School from './School.vue'
export default {
    name: 'App',
    components: {
        School,
        Student
    }
}
</script>

<style>

</style>
```
```javascript
import App from './App.vue'
new Vue({
    el: '#root',
    components: {App}
})
```
```javascript
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div id="root">
        <App></App>
    </div>
    <script src="../../day01/vue.js"></script>
    <script src="./main.js"></script>
</body>
</html>
```
<a name="KPuCl"></a>
# 脚手架
使用前置：

- 第一步(没有安装过的执行)：全局安装 @vue/cli

npm install -g @vue/cli

- 第二步：切换到要创建项目的目录，然后使用命令创建项目

vue create xxxxx

- 第三步：启动项目

npm run serve
<a name="DlyDv"></a>
### 脚手架文件结构
```javascript
├── node_modules 
├── public
│   ├── favicon.ico: 页签图标
│   └── index.html: 主页面
├── src
│   ├── assets: 存放静态资源
│   │   └── logo.png
│   │── component: 存放组件
│   │   └── HelloWorld.vue
│   │── App.vue: 汇总所有组件
│   │── main.js: 入口文件
├── .gitignore: git版本管制忽略的配置
├── babel.config.js: babel的配置文件
├── package.json: 应用包配置文件 
├── README.md: 应用描述文件
├── package-lock.json：包版本控制文件
```
<a name="O9qgT"></a>
### render函数
关于不同版本 vue 的区别

- vue.js与vue.runtime.xxx.js的区别：
   - vue.js是完整版的Vue，包含：核心功能+模板解析器。
   - vue.runtime.xxx.js是运行版的Vue，只包含：核心功能；没有模板解析器。
- 因为vue.runtime.xxx.js没有模板解析器，所以不能使用template配置项，需要使用render函数接收到的createElement函数去指定具体内容。
<a name="K7ygK"></a>
### 修改脚手架的默认配置

- 使用vue inspect > output.js可以查看到Vue脚手架的默认配置。
- 使用vue.config.js可以对脚手架进行个性化定制，详情见：https://cli.vuejs.org/zh
<a name="UwsDJ"></a>
### 脚手架中的index.html
```javascript
<!DOCTYPE html>
<html lang="">
  <head>
    <meta charset="utf-8">
	<!-- 针对IE浏览器的一个特殊配置，含义是让IE浏览器以最高的渲染级别渲染页面 -->
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
	<!-- 开启移动端的理想视口 -->
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
	<!-- 配置页签图标 -->
    <link rel="icon" href="<%= BASE_URL %>favicon.ico">
	<!-- 引入第三方样式 -->
	<link rel="stylesheet" href="<%= BASE_URL %>css/bootstrap.css">
	<!-- 配置网页标题 -->
    <title>硅谷系统</title>
  </head>
  <body>
		<!-- 当浏览器不支持js时noscript中的元素就会被渲染 -->
    <noscript>
      <strong>We're sorry but <%= htmlWebpackPlugin.options.title %> doesn't work properly without JavaScript enabled. Please enable it to continue.</strong>
    </noscript>
		<!-- 容器 -->
    <div id="app"></div>
    <!-- built files will be auto injected -->
  </body>
</html>
```
<a name="A2TBB"></a>
## vue 零碎的一些知识
<a name="m2GpJ"></a>
### ref属性

- 被用来给元素或子组件注册引用信息（id的替代者）
- 应用在html标签上获取的是真实DOM元素，应用在组件标签上是组件实例对象（vc）
- 使用方式：
   - 打标识：<h1 ref="xxx">.....</h1>或 <School ref="xxx"></School>
   - 获取：this.$refs.xxx
```javascript
<template>
  <div>
    <h1 v-text='welcome' ref='title'></h1>
    <button @click='showDOM' ref='btn'>点我输出上方的DOM元素</button>
    <Student ref='sch'></Student>
  </div>
</template>

<script>
import Student from './components/Student.vue'
export default {
    name: 'App',
    components: {
        Student
    },
    data() {
        return {
            welcome: '欢迎访问！'
        }
    },
    methods: {
        showDOM() {
            console.log(this.$refs.title)//真实DOM元素
            console.log(this.$refs.btn)//真实DOM
            console.log(this.$refs.sch)//School组件的实例对象（vc）
        }
    }
}
</script>
```
<a name="T2uhC"></a>
### props配置项

1. 功能：让组件接收外部传过来的数据
2. 传递数据：<Demo name="xxx"/>
3. 接收数据：
   1. 第一种方式（只接收）：props:['name']
   2. 第二种方式（限制类型）：props:{name:String}
   3. 第三种方式（限制类型、限制必要性、指定默认值）：
4. 注意：
- props是只读的，Vue底层会监测你对props的修改，如果进行了修改，就会发出警告，若业务需求确实需要修改，那么请复制props的内容到data中一份，然后去修改data中的数据。
```javascript
<template>
  <div class="student">
    <h1>{{msg}}</h1>
    <h2>姓名：{{ name }}</h2>
    <h2>年龄：{{ myAge }}</h2>
    <button @click="myAge++">点我年龄+1</button>
  </div>
</template>

<script>
export default {
  name: "StudentCom",
  data() {
    return {
      msg: 'Hello!',
      myAge: this.age
    }
  },
  // props: ['name', 'age']  简单接收

  /* props: {//接收的同时对数据进行类型限制
    name: String,
    age: Number
  } */

  props: {//接收的同时对数据进行类型限制—+默认值的指定+必要性的限制
    name: {
      type: String, //name的类型是字符串
      required: true //name是必要的
    },
    age: {
      type: Number,
      default: 99 //不是必须要传的，不传的话默认值为99
    }
  }
};
</script>
```
```javascript
<template>
  <div>
    <Student name='Leah' ></Student>
  </div>
</template>

<script>
import Student from "./components/Student.vue";
export default {
  name: "App",
  components: {
    Student,
  },
};
</script>
```
<a name="tKHnm"></a>
### mixin(混入)

- 功能：可以把多个组件公用的配置提取成一个混入对象
- 使用方法
   1. 定义混入
```javascript
const mixin + {
  data() {...}
  methods: {...}
}
```

   2. 使用混入
      1. 全局混入：Vue.mixin(xxx)
      2. 局部混入：mixins:['xxx']

**选项合并**<br />当组件和混入对象含有同名选项时，这些选项将以恰当的方式进行“合并”。

- 数据对象在内部会进行递归合并，并在发生冲突时以组件数据优先。
- 同名钩子函数将合并为一个数组，因此都将被调用。另外，混入对象的钩子将在组件自身钩子**之前**调用。
- 值为对象的选项，例如 methods、components 和 directives，将被合并为同一个对象。两个对象键名冲突时，取组件对象的键值对。
```javascript
export const showname = {
    methods: {
        showName() {
            alert(this.name)
        }
    }
}
export const nums = {
    data() {
        return {
            aaa: 111,
            bbb: 222
        }
    }
}
```
```javascript
<template>
  <div>
    <h2 @click='showName'>姓名：{{name}}</h2>
    <h2>年龄：{{age}}</h2>
    <h2>性别：{{gender}}</h2>
  </div>
</template>

<script>
// 引入一个混合
import {showname, nums} from '../mixin'
export default {
  name: 'StudentCom',
  data() {
    return {
      name: 'Leah',
      age: 23,
      gender: 'female',
      aaa: 333
    }
  },
  mixins: [showname, nums]
}
</script>
```
```javascript
<template>
  <div>
    <h3 @click='showName'>{{name}}</h3>
    <ul>
        <h4>作品：</h4>
        <li>{{songOne}}</li><br>
        <li>{{songTwo}}</li>
    </ul>
  </div>
</template>

<script>
import {showname, nums} from '../mixin'
export default {
    name: 'SingerCom',
    data() {
        return {
            name: 'Taylor Swift',
            songOne: 'Lover',
            songTwo: 'Welcome to NewYork',
            aaa: 444
        }
    },
    mixins: [showname, nums]
}
</script>
```
<a name="d03jg"></a>
### 插件

1. 功能：用于增强Vue
2. 本质：包含install方法的一个对象，install的第一个参数是Vue，第二个以后的参数是插件使用者传递的数据
3. 定义插件
4. 使用插件：Vue.use()
```javascript
export default {
    install(Vue, a, b, c) {
        console.log(a, b, c)
        // 全局过滤器
        Vue.filter('Myslice', function (value) {
            return value.slice(0, 4)
        })

        // v-fbind全局指令
        Vue.directive('fbind', {
            bind(element, binding) {
                element.value = binding.value
            },
            inserted(element) {
                element.focus()
            },
            update(element, binding) {
                element.value = binding.value
                element.focus()
            }
        })

        // 定义全局混入
        Vue.mixin({
            data() {
                return {
                    aaa: 111,
                    bbb: 222
                }
            }
        })

        // 给Vue原型添加一个方法（vm和vc都能用）
        Vue.prototype.hello = () => {
            alert('Hello!')
        }
    }
}

```
```javascript
// 导入组件模块
import Vue from 'vue'
import App from './App.vue'
import plugins from './plugins'

// 关闭生产提示
Vue.config.productionTip = false
Vue.use(plugins, 1, 2, 3)

// 创建Vue实例
new Vue({
    el: "#app",
    render: h => h(App)
})
```
```javascript
<template>
  <div>
    <h3>{{name}}</h3>
    <ul>
        <h4>作品：</h4>
        <li>{{songOne | Myslice}}</li><br>
        <li>{{songTwo}}</li>
    </ul>
  </div>
</template>

<script>
export default {
    name: 'SingerCom',
    data() {
        return {
            name: 'Taylor Swift',
            songOne: 'Lover',
            songTwo: 'Welcome to NewYork',
        }
    },
}
</script>

<style>

</style>
```
```javascript
<template>
  <div>
    <h2>姓名：{{name}}</h2>
    <h2>年龄：{{age}}</h2>
    <h2>性别：{{gender}}</h2>
    <h2>喜欢的歌手：<input type="text" v-fbind='singer'></h2>
  </div>
</template>

<script>
export default {
  name: 'StudentCom',
  data() {
    return {
      name: 'Leah',
      age: 23,
      gender: 'female',
      singer: 'Taylor'
    }
  },
}
</script>

<style>

</style> 
```
<a name="NtrFX"></a>
### scoped样式

1. 作用：让样式在局部生效，防止冲突。
2. 写法：<style scoped>
<a name="gTlMP"></a>
### 总结TodoList案例

1. 组件化编码流程：
   1. 拆分静态组件：组件要按照功能点拆分，命名不要与html元素冲突。
   2. 实现动态组件：考虑好数据的存放位置，数据是一个组件在用，还是一些组件在用：
      1. 一个组件在用：放在组件自身即可。
      2. 一些组件在用：放在他们共同的父组件上（状态提升）。
   3. 实现交互：从绑定事件开始。
2. props适用于：
3. 使用v-model时要切记：v-model绑定的值不能是props传过来的值，因为props是不可以修改的！
4. props传过来的若是对象类型的值，修改对象中的属性时Vue不会报错，但不推荐这样做。
<a name="Nclhh"></a>
## 浏览器本地存储
<a name="ynNID"></a>
### Cookie
Cookie是最早被提出来的本地存储方式，在此之前，服务端是无法判断网络中的两个请求是否是同一用户发起的，为解决这个问题，Cookie就出现了。Cookie 是存储在用户浏览器中的一段不超过 4 KB 的字符串。它由一个名称（Name）、一个值（Value）和其它几个用 于控制 Cookie 有效期、安全性、使用范围的可选属性组成。不同域名下的 Cookie 各自独立，每当客户端发起请求时，会自动把当前域名下所有未过期的 Cookie 一同发送到服务器。<br />**Cookie的特性：**

- Cookie一旦创建成功，名称就无法修改
- Cookie是无法跨域名的，也就是说a域名和b域名下的cookie是无法共享的，这也是由Cookie的隐私安全性决定的，这样就能够阻止非法获取其他网站的Cookie
- 每个域名下Cookie的数量不能超过20个，每个Cookie的大小不能超过4kb
- 有安全问题，如果Cookie被拦截了，那就可获得session的所有信息，即使加密也于事无补，无需知道cookie的意义，只要转发cookie就能达到目的
- Cookie在请求一个新的页面的时候都会被发送过去

**Cookie 不具有安全性**<br />由于 Cookie 是存储在浏览器中的，而且浏览器也提供了读写 Cookie 的 API，因此 Cookie 很容易被伪造，不具有安全 性。因此不建议服务器将重要的隐私数据，通过 Cookie 的形式发送给浏览器。
<a name="OUOy5"></a>
### Session
Session是另一种记录客户状态的机制，不同的是Cookie保存在客户端浏览器中，而Session保存在服务器上。客户端浏览器访问服务器的时候，服务器把客户端信息以某种形式记录在服务器上。这就是Session。客户端浏览器再次访问时只需要从该Session中查找该客户的状态就可以了session是一种特殊的cookie。cookie是保存在客户端的，而session是保存在服务端。<br />**session原理**<br />当客户端第一次请求服务器的时候，服务器生成一份session保存在服务端，将该数据(session)的id以cookie的形式传递给客户端；以后的每次请求，浏览器都会自动的携带cookie来访问服务器(session数据id)。
<a name="PfwZp"></a>
### LocalStorage
LocalStorage是HTML5新引入的特性，由于有的时候我们存储的信息较大，Cookie就不能满足我们的需求，这时候LocalStorage就派上用场了。<br />**LocalStorage的优点：**

- 在大小方面，LocalStorage的大小一般为5MB，可以储存更多的信息
- LocalStorage是持久储存，并不会随着页面的关闭而消失，除非主动清理，不然会永久存在
- 仅储存在本地，不像Cookie那样每次HTTP请求都会被携带

**LocalStorage的缺点：**

- 存在浏览器兼容问题，IE8以下版本的浏览器不支持
- 如果浏览器设置为隐私模式，那我们将无法读取到LocalStorage
- LocalStorage受到同源策略的限制，即端口、协议、主机地址有任何一个不相同，都不会访问

**LocalStorage的常用API：**
```javascript
// 保存数据到 localStorage
localStorage.setItem('key', 'value');

// 从 localStorage 获取数据
let data = localStorage.getItem('key');

// 从 localStorage 删除保存的数据
localStorage.removeItem('key');

// 从 localStorage 删除所有保存的数据
localStorage.clear();

// 获取某个索引的Key
localStorage.key(index)
```
**LocalStorage的使用场景:**

- 有些网站有换肤的功能，这时候就可以将换肤的信息存储在本地的LocalStorage中，当需要换肤的时候，直接操作LocalStorage即可
- 在网站中的用户浏览信息也会存储在LocalStorage中，还有网站的一些不常变动的个人信息等也可以存储在本地的LocalStorage中
<a name="oZni2"></a>
### SessionStorage
SessionStorage和LocalStorage都是在HTML5才提出来的存储方案，SessionStorage 主要用于临时保存同一窗口(或标签页)的数据，刷新页面时不会删除，关闭窗口或标签页之后将会删除这些数据。<br />**SessionStorage与LocalStorage对比：**

- SessionStorage和LocalStorage都在本地进行数据存储；
- SessionStorage也有同源策略的限制，但是SessionStorage有一条更加严格的限制，SessionStorage只有在同一浏览器的同一窗口下才能够共享；
- LocalStorage和SessionStorage都不能被爬虫爬取；

**SessionStorage的常用API：**
```javascript
// 保存数据到 sessionStorage
sessionStorage.setItem('key', 'value');

// 从 sessionStorage 获取数据
let data = sessionStorage.getItem('key');

// 从 sessionStorage 删除保存的数据
sessionStorage.removeItem('key');

// 从 sessionStorage 删除所有保存的数据
sessionStorage.clear();

// 获取某个索引的Key
sessionStorage.key(index)
```
**SessionStorage的使用场景**<br />由于SessionStorage具有时效性，所以可以用来存储一些网站的游客登录的信息，还有临时的浏览记录的信息。当关闭网站之后，这些信息也就随之消除了。
<a name="XdDxo"></a>
## 组件自定义事件
组件自定义事件是一种组件间通信的方式，适用于：**子组件 ===> 父组件**<br />**使用场景**<br />A是父组件，B是子组件，B想给A传数据，那么就要在A中给B绑定自定义事件（事件的回调在A中）。<br />**绑定自定义事件：**<br />第一种方式，在父组件中：<Demo @atguigu="test"/>或 <Demo v-on:atguigu="test"/><br />第二种方式，在父组件中：使用 this.$refs.xxx.$on() 这样写起来更灵活，比如可以加定时器

- 若想让自定义事件只能触发一次，可以使用once修饰符，或$once方法。
- 触发自定义事件：this.$emit('atguigu',数据)

**解绑自定义事件**this.$off('atguigu')<br />**组件上也可以绑定原生DOM事件，需要使用native修饰符**<br />注意：通过this.$refs.xxx.$on('atguigu',回调)绑定自定义事件时，回调要么配置在methods中，要么用箭头函数，否则this指向会出问题！<br />【vue中使用 $emit(eventName) 触发事件，使用 $on(eventName) [监听事件](https://so.csdn.net/so/search?q=%E7%9B%91%E5%90%AC%E4%BA%8B%E4%BB%B6&spm=1001.2101.3001.7020)<br />$emit(eventName) 触发当前实例上的事件，附加参数都会传给[监听器](https://so.csdn.net/so/search?q=%E7%9B%91%E5%90%AC%E5%99%A8&spm=1001.2101.3001.7020)回调。<br />on(evetName) 监听当前实例上的自定义事件。事件可以由vm.on(eventName) 监听当前实例上的自定义事件。事件可以由 vm.on(eventName)监听当前实例上的自定义事件。事件可以由vm.emit 触发。回调函数会接收所有传入[事件触发](https://so.csdn.net/so/search?q=%E4%BA%8B%E4%BB%B6%E8%A7%A6%E5%8F%91&spm=1001.2101.3001.7020)函数的额外参数。】
```javascript
<template>
  <div class="warp">
    <h1>{{msg}}大学首页：{{studentName}}</h1>
    <!-- 通过父组件给子组件传递函数类型的props实现：子给父传递数据 -->
    <Student :getstuInfo='getstuInfo'/>
    <!-- 通过父组件给子组件绑定一个自定义事件实现：子给父传递数据（第一种写法，使用@或v-on） -->
    <!-- <School v-on:getschInfo='getschInfo'/> -->
    
    <!-- 通过父组件给子组件绑定一个自定义事件实现：子给父传递数据（第二种写法，使用ref） -->
    <School ref='school' @click.native='show()'/>
    <!-- 加上native修饰符会把@click自定义事件还原成原生事件 -->
  </div>
</template>

<script>
import Student from "./components/Student.vue";
import School from "./components/School.vue";
export default {
  name: "App",
  components: {
    Student,
    School,
  },
  data() {
    return {
        msg: "Hello!",
        studentName: ''
    }
  },
  methods: {
    getstuInfo(info) {
        console.log(info)
    },
    getschInfo(info) {
        this.studentName = info
    },
    show() {
        alert(123)
    }
  },
    mounted() {
        this.$refs.school.$on('getschInfo', this.getschInfo)
    }
};
</script>

<style>
.warp {
    background-color: gray;
    padding: 20px;
}
</style>
```
```javascript
<template>
    <div class="stu">
        <h2>姓名：{{name}}</h2>
        <h2>年龄：{{age}}</h2>
        <button @click='trasInfo'>点击获取信息</button>
    </div>
</template>

<script>
export default {
  name: "StudentCom",
  data() {
    return {
      name: "Leah",
      age: 23,
    };
  },
  props: ['getstuInfo'],
  methods: {
    trasInfo() {
        this.getstuInfo(this.name)
    }
  }
};
</script>

<style>
.stu {
    background-color: #bfa;
    padding: 20px;
    margin: 30px;
}
</style> 
```
```javascript
<template>
  <div class="sch">
    <h2>学校：{{ name }}</h2>
    <h2>地址：{{ address }}</h2>
    <h2>当前n的值为：{{n}}</h2>
    <button @click='add'>点我n+</button>
    <button @click="transInfo">点击获取信息</button>
    <button @click="unbind">点击解绑事件</button>
    <button @click='death'>点我销毁School组件</button>
  </div>
</template>

<script>
export default {
  name: "SchoolCom",
  data() {
    return {
      name: "B站大学",
      address: "哔哩哔哩",
      n: 1
    };
  },
  methods: {
    add() {
        console.log('add回调被调用了')
        this.n++
    },
    transInfo() {
        this.$emit('getschInfo', this.name)
        // this.$emit('click')
    },
    unbind() {
        this.$off('getschInfo')
        // this.$off(['getschInfo', 'xxx'])//解绑多个自定义事件
        this.$off()//解绑所有的自定义事件
    },
    death() {
        this.$destroy()
    }
  }
};
</script>

<style>
.sch {
  background-color: skyblue;
  padding: 20px;
  margin: 30px;
}
</style>
```
<a name="AGXOJ"></a>
## 全局事件总线

1. 一种组件间通信的方式，适用于任意组件间通信。
2. 安装全局事件总线：
```javascript
new Vue({
	......
	beforeCreate() {
		Vue.prototype.$bus = this //安装全局事件总线，$bus就是当前应用的vm
	},
    ......
}) 
```

3. 使用事件总线：
   1. 接收数据：A组件想接收数据，则在A组件中给$bus绑定自定义事件，事件的回调留在A组件自身。
```javascript
methods(){
  demo(data){......}
}
......
mounted() {
  this.$bus.$on('xxxx',this.demo)
}
```

   2. 提供数据：this.$bus.$emit('xxxx',数据)
4. 最好在beforeDestroy钩子中，用$off去解绑当前组件所用到的事件。
```javascript
// 导入模块和组件
import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
    el: '#app',
    components: {
        App
    },
    render: h => h(App),
    beforeCreate() {
        Vue.prototype.$bus = this//定义全局事件总线
    }
})
```
```javascript
<template>
  <div class="warp">
    <Student/>
    <School/>
  </div>
</template>

<script>
import Student from "./components/Student.vue";
import School from "./components/School.vue";
export default {
  name: "App",
  components: {
    Student,
    School,
  }
};
</script>

<style>
.warp {
    background-color: gray;
    padding: 20px;
}
</style>
```
```javascript
<template>
    <div class="stu">
        <h2>姓名：{{name}}</h2>
        <h2>年龄：{{age}}</h2>
        <button @click="sendName">点击传送姓名</button>
    </div>
</template>

<script>
export default {
  name: "StudentCom",
  data() {
    return {
      name: "Leah",
      age: 23,
    };
  },
  methods: {
    sendName() {
      this.$bus.$emit('sendName', this.name)
    }
  }
};
</script>

<style>
.stu {
    background-color: #bfa;
    padding: 20px;
    margin: 30px;
}
</style> 
```
```javascript
<template>
  <div class="sch">
    <h2>学校：{{ name }}</h2>
    <h2>地址：{{ address }}</h2>
  </div>
</template>

<script>
export default {
  name: "SchoolCom",
  data() {
    return {
      name: "B站大学",
      address: "哔哩哔哩",
    }
  },
  mounted() {
    this.$bus.$on('sendName', data => console.log('我是School组件，我收到了数据', data))
  },
  beforeDestroy() {
    this.$bus.$off('sendName')
  }
};
</script>

<style>
.sch {
  background-color: skyblue;
  padding: 20px;
  margin: 30px;
}
</style>
```
<a name="k0MFC"></a>
## 消息订阅与发布

1. 一种组件间通信的方式，适用于任意组件间通信。
2. 使用步骤：
   1. 安装pubsub：npm i pubsub-js
   2. 引入: import pubsub from 'pubsub-js'
   3. 接收数据：A组件想接收数据，则在A组件中订阅消息，订阅的回调留在A组件自身。
```javascript
methods:{
  demo(data){......}
}
......
mounted() {
  this.pid = pubsub.subscribe('xxx',this.demo) //订阅消息，注意这里有两个参数
  //也可以使用箭头函数，为了保证获得的数据在Vue实例身上
}

```

   4. 提供数据：pubsub.publish('xxx',数据)
   5. 最好在beforeDestroy钩子中，用PubSub.unsubscribe(pid)去取消订阅。
```javascript
<template>
    <div class="stu">
        <h2>姓名：{{name}}</h2>
        <h2>年龄：{{age}}</h2>
        <button @click="sendName">点击传送姓名</button>
    </div>
</template>

<script>
import pubsub from 'pubsub-js'
export default {
  name: "StudentCom",
  data() {
    return {
      name: "Leah",
      age: 23,
    };
  },
  methods: {
    sendName() {
      pubsub.publish('hello', this.name)
    }
  }
};
</script>

<style>
.stu {
    background-color: #bfa;
    padding: 20px;
    margin: 30px;
}
</style> 
```
```javascript
<template>
  <div class="sch">
    <h2>学校：{{ name }}</h2>
    <h2>地址：{{ address }}</h2>
  </div>
</template>

<script>
import pubsub from 'pubsub-js'
export default {
  name: "SchoolCom",
  data() {
    return {
      name: "B站大学",
      address: "哔哩哔哩",
    }
  },
  mounted() {
    this.pubId = pubsub.subscribe('hello', (msgName, info) => {
      console.log('有人发布了hello消息，hello消息的回调执行了', msgName, info)
    })
  },
  beforeDestroy() {
    pubsub.unsubscribe(this.pubId)
  }
};
</script>

<style>
.sch {
  background-color: skyblue;
  padding: 20px;
  margin: 30px;
}
</style>
```
<a name="vaH1x"></a>
## nextTick

1. 语法：this.$nextTick(回调函数)
2. 作用：在下一次 DOM 更新结束后执行其指定的回调。
3. 什么时候用：当改变数据后，要基于更新后的新DOM进行某些操作时，要在nextTick所指定的回调函数中执行。
<a name="qUSaW"></a>
## Vue封装的过渡与动画

1. 作用：在插入、更新或移除 DOM元素时，在合适的时候给元素添加样式类名。
2. 写法：
   1. 准备好样式：
   - 元素进入的样式：
      1. v-enter：进入的起点
      2. v-enter-active：进入过程中
      3. v-enter-to：进入的终点
   - 元素离开的样式：
      1. v-leave：离开的起点
      2. v-leave-active：离开过程中
      3. v-leave-to：离开的终点
   2. 使用<transition>包裹要过渡的元素，并配置name属性。
      1. name 的作用可以让让不同的元素有不同的动画效果
3. 备注：若有多个元素需要过度，则需要使用：<transition-group>，且每个元素都要指定key值
<a name="foJU7"></a>
## vue脚手架配置代理
![image.png](https://cdn.nlark.com/yuque/0/2023/png/32917541/1675870429324-04f3c9ca-7b77-4e25-a0bf-1568ee649992.png#averageHue=%23f3f1ef&clientId=u607f265b-6996-4&from=paste&height=132&id=u47d80eb2&name=image.png&originHeight=132&originWidth=767&originalType=binary&ratio=1&rotation=0&showTitle=false&size=23202&status=done&style=none&taskId=ub52e7cae-21aa-4c1e-a5aa-79ef38516d4&title=&width=767)
<a name="mEiFF"></a>
### 方法一
在vue.config.js中添加如下配置：
```javascript
devServer:{
  proxy:"http://localhost:5000"
}
```

1. 优点：配置简单，请求资源时直接发给前端（8080）即可。
2. 缺点：不能配置多个代理，不能灵活的控制请求是否走代理。
3. 工作方式：若按照上述配置代理，当请求了前端不存在的资源时，那么该请求会转发给服务器 （优先匹配前端资源）
<a name="TTORz"></a>
### 方法二
编写vue.config.js配置具体代理规则：
```javascript
module.exports = {
	devServer: {
      proxy: {
      '/api1': {// 匹配所有以 '/api1'开头的请求路径
        target: 'http://localhost:5000',// 代理目标的基础路径
        changeOrigin: true,
        pathRewrite: {'^/api1': ''}//代理服务器将请求地址转给真实服务器时会将 /api1 去掉
      },
      '/api2': {// 匹配所有以 '/api2'开头的请求路径
        target: 'http://localhost:5001',// 代理目标的基础路径
        changeOrigin: true,
        pathRewrite: {'^/api2': ''}
      }
    }
  }
}
/*
   changeOrigin设置为true时，服务器收到的请求头中的host为：localhost:5000
   changeOrigin设置为false时，服务器收到的请求头中的host为：localhost:8080
   changeOrigin默认值为true
*/
```

1. 优点：可以配置多个代理，且可以灵活的控制请求是否走代理。
2. 缺点：配置略微繁琐，请求资源时必须加前缀。
<a name="eTTXb"></a>
## slot插槽

1. 作用：让父组件可以向子组件指定位置插入html结构，也是一种组件间通信的方式，适用于 **父组件 ===> 子组件** 。
2. 分类：默认插槽、具名插槽、作用域插槽
3. 使用方式：
   1. 默认插槽：
```javascript
父组件中：
        <Category>
           <div>html结构1</div>
        </Category>
子组件中：
        <template>
            <div>
               <!-- 定义插槽 -->
               <slot>插槽默认内容...</slot>
            </div>
        </template>
```

   2. 具名插槽：
```javascript
父组件中：
        <Category>
            <template slot="center">
              <div>html结构1</div>
            </template>

            <template v-slot:footer>
               <div>html结构2</div>
            </template>
        </Category>
子组件中：
        <template>
            <div>
               <!-- 定义插槽 -->
               <slot name="center">插槽默认内容...</slot>
               <slot name="footer">插槽默认内容...</slot>
            </div>
        </template>
```

   3. 作用域插槽：
      1. 理解：数据在组件的自身（子组件），但根据数据生成的结构需要组件的使用者（父组件）来决定。（games数据在Category（子）组件中，但使用数据所遍历出来的结构由App（父）组件决定）
```javascript
父组件中：
		<Category>
			<template scope="scopeData">
				<!-- 生成的是ul列表 -->
				<ul>
					<li v-for="g in scopeData.games" :key="g">{{g}}</li>
				</ul>
			</template>
		</Category>

		<Category>
			<template slot-scope="scopeData">
				<!-- 生成的是h4标题 -->
				<h4 v-for="g in scopeData.games" :key="g">{{g}}</h4>
			</template>
		</Category>
子组件中：
        <template>
            <div>
            <!-- 通过数据绑定就可以把子组件的数据传到父组件 -->
                <slot :games="games"></slot>
            </div>
        </template>
		
        <script>
            export default {
                name:'Category',
                props:['title'],
                //数据在子组件自身
                data() {
                    return {
                        games:["王者荣耀", "英雄联盟", "三国杀", "欢乐斗地主"]
                    }
                },
            }
        </script>
```
**注意：**关于样式，既可以写在负组件中，解析后放入子组件插槽；也可以放在子组件中，传给子组件在解析
<a name="DevJu"></a>
# VUEX
原理图：<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/32917541/1675929189345-1591e0d4-0178-4ae5-873d-191384a01e45.png#averageHue=%23fefdfb&clientId=ud709b3d1-bfe2-4&from=paste&id=u38bb0006&name=image.png&originHeight=692&originWidth=813&originalType=url&ratio=1&rotation=0&showTitle=false&size=75020&status=done&style=none&taskId=u5b1d641d-53cc-43f1-bce0-a0aad759835&title=)
<a name="s3MbN"></a>
### 概念
在Vue中实现集中式状态（数据）管理的一个Vue插件，对vue应用中多个组件的共享状态进行集中式的管理（读/写），也是一种组件间通信的方式，且适用于任意组件间通信。
<a name="RurHi"></a>
### 何时使用？
多个组件需要共享数据时
<a name="zoUbS"></a>
### 搭建vuex环境

1. 创建文件：src/store/index.js
```javascript
//引入Vue核心库
import Vue from 'vue'
//引入Vuex
import Vuex from 'vuex'
//应用Vuex插件
Vue.use(Vuex)

//准备actions对象——响应组件中用户的动作
const actions = {}
//准备mutations对象——修改state中的数据
const mutations = {}
//准备state对象——保存具体的数据
const state = {}

//创建并暴露store
export default new Vuex.Store({
	actions,
	mutations,
	state
})
```

2. 在main.js中创建vm时传入store配置项
```javascript
......
//引入store
import store from './store'
......

//创建vm
new Vue({
	el:'#app',
	render: h => h(App),
	store
})
```
<a name="QzUGB"></a>
### 基本使用

1. 初始化数据、配置actions、配置mutations，操作文件store.js
2. 组件中读取vuex中的数据：$store.state.sum
3. 组件中修改vuex中的数据：$store.dispatch('action中的方法名',数据)或 $store.commit('mutations中的方法名',数据)

注意：若没有网络请求或其他业务逻辑，组件中也可以越过actions，即不写dispatch，直接编写commit
```javascript
// 导入组件模块
import Vue from 'vue'
import App from './App.vue'
import store from './store'
// 关闭生产提示
Vue.config.productionTip = false

// 创建Vue实例
new Vue({
    el: "#app",
    render: h => h(App),
    store,
    beforeCreate() {
        Vue.prototype.$bus = this
    }
})
```
```javascript
// 该文件用于创建Vuex中最为核心的是store
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

// 准备actions--用于响应组件中的动作
const actions = {
    /* add(context, value) {
        context.commit('Add', value)
    },
    reduce(context, value) {
        context.commit('Reduce', value)
    }, */
    addOdd(context, value) {
        if(context.state.sum % 2) {
            context.commit('AddOdd', value)
        }
    },
    addWait(context, value) {
        setTimeout(() => {
            context.commit('AddWait', value)
        }, 1000)
    }
}
// 准备mutations--用于操作数据（state）
const mutations = {
    Add(state, value) {
        state.sum += value
    },
    Reduce(state, value) {
        state.sum -= value
    },
    AddOdd(state, value) {
        state.sum += value
    },
    AddWait(state, value) {
        state.sum += value
    }
}
// 准备state--用于存储数据
const state = {
    sum: 0,
}

// 创建并暴露store
export default new Vuex.Store({
    actions,
    mutations,
    state
})

```
```javascript
<template>
 <Count></Count>
</template>

<script>
import Count from "./components/Count.vue";
export default {
  name: "App",
  components: {
    Count,
  },
};
</script>

<style scoped>

</style>
```
```javascript
<template>
  <div>
    <h1>当前求和为：{{ $store.state.sum }}</h1>
    <select v-model.number="n">
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
    </select>
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
    <button @click="incrementOdd">当前求和为奇数再加</button>
    <button @click="incrementWait">等一等再加</button>
  </div>
</template>

<script>
export default {
  name: "CountCom",
  data() {
    return {
      n: 1, //用户选择的数字
    };
  },
  methods: {
    increment() {
      // 若没有网络请求或其他业务逻辑，组件中也可以越过actions，即不写dispatch，直接编写commit
      this.$store.commit("Add", this.n);
    },
    decrement() {
      this.$store.commit("Reduce", this.n);
    },
    incrementOdd() {
      this.$store.dispatch("addOdd", this.n);
    },
    incrementWait() {
      this.$store.dispatch("addWait", this.n);
    },
  },
};
</script>

<style>
button {
  margin: 5px;
}
</style>
```
<a name="Lm279"></a>
### getters的使用

1. 概念：当state中的数据需要经过加工后再使用时，可以使用getters加工。
2. 在store.js中追加getters配置
```javascript
......

const getters = {
	bigSum(state){
		return state.sum * 10
	}
}

//创建并暴露store
export default new Vuex.Store({
	......
	getters
})
```

3. 组件中读取数据：$store.getters.bigSum
<a name="gazdd"></a>
### 四个map方法的使用
导入<br />`import{mapState, mapGetters, mapActions, mapMutations}from'vuex'`

1. **mapState方法：**用于帮助我们映射state中的数据为计算属性
```javascript
computed: {
    //借助mapState生成计算属性：sum、school、subject（对象写法）
     ...mapState({sum:'sum',school:'school',subject:'subject'}),
         
    //借助mapState生成计算属性：sum、school、subject（数组写法）
    ...mapState(['sum','school','subject']),
},
```

2. **mapGetters方法：**用于帮助我们映射getters中的数据为计算属性
```javascript
computed: {
    //借助mapGetters生成计算属性：bigSum（对象写法）
    ...mapGetters({bigSum:'bigSum'}),

    //借助mapGetters生成计算属性：bigSum（数组写法）
    ...mapGetters(['bigSum'])
},
```

3. **mapActions方法：**用于帮助我们生成与actions对话的方法，即：包含$store.dispatch(xxx)的函数
```javascript
methods:{
    //靠mapActions生成：incrementOdd、incrementWait（对象形式）
    ...mapActions({incrementOdd:'jiaOdd',incrementWait:'jiaWait'})

    //靠mapActions生成：incrementOdd、incrementWait（数组形式）
    ...mapActions(['jiaOdd','jiaWait'])
}
```

4. **mapMutations方法：**用于帮助我们生成与mutations对话的方法，即：包含$store.commit(xxx)的函数
```javascript
methods:{
    //靠mapActions生成：increment、decrement（对象形式）
    ...mapMutations({increment:'JIA',decrement:'JIAN'}),
    
    //靠mapMutations生成：JIA、JIAN（对象形式）
    ...mapMutations(['JIA','JIAN']),
}
```
注意：

- mapActions与mapMutations使用时，若需要传递参数需要：在模板中绑定事件时传递好参数，否则传的参数是事件对象(event)。
```javascript
<template>
  <div>
    <h1>当前求和为：{{ sum }}</h1>
    <h1>放大10倍为：{{ TenSum }}</h1>
    <h1>我在{{school}}学习{{subject}}</h1>
    <select v-model.number="n">
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
    </select>
    <button @click="increment(n)">+</button>
    <button @click="decrement(n)">-</button>
    <button @click="incrementOdd(n)">当前求和为奇数再加</button>
    <button @click="incrementWait(n)">等一等再加</button>
  </div>
</template>

<script>
import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
export default {
  name: "CountCom",
  data() {
    return {
      n: 1, //用户选择的数字
    };
  },
  methods: {
    /* increment() {
      this.$store.commit("Add", this.n);
    },
    decrement() {
      this.$store.commit("Reduce", this.n);
    },
    incrementOdd() {
      this.$store.dispatch("addOdd", this.n);
    },
    incrementWait() {
      this.$store.dispatch("addWait", this.n);
    }, */

    // 借助mapMutation生成对应的方法，方法中会调用commit去联系mutations（对象写法）
    // 【也有数组写法，同mapState】
    ...mapMutations({increment:'Add', decrement: 'Reduce'} ),
    ...mapActions({incrementOdd: 'addOdd', incrementWait: 'addWait'})
  },
  computed: {
    // 借助mapState生成计算属性，从state中读取数据。(对象写法)
    // ...mapState({sum: 'sum', school: 'school', subject: 'subject'}),
    //不可使用对象简写类似于{a: 'a'}
    // 借助mapState生成计算属性，从state中读取数据。(数组写法)
    ...mapState(['sum', 'school', 'subject']),
    ...mapGetters({TenSum: 'TenSum'})
  },
};
</script>
```
<a name="hc0AN"></a>
### 模块化+命名空间

1. 目的：让代码更好维护，让多种数据分类更加明确。
2. 修改store.js
```javascript
const countAbout = {
  namespaced:true,//开启命名空间
  state:{x:1},
  mutations: { ... },
  actions: { ... },
  getters: {
    bigSum(state){
       return state.sum * 10
    }
  }
}

const personAbout = {
  namespaced:true,//开启命名空间
  state:{ ... },
  mutations: { ... },
  actions: { ... }
}

const store = new Vuex.Store({
  modules: {
    countAbout,
    personAbout
  }
})
```

3. 开启命名空间后，组件中读取state数据：
```javascript
//方式一：自己直接读取
this.$store.state.personAbout.list
//方式二：借助mapState读取：
// 用 mapState 取 countAbout 中的state 必须加上 'countAbout'
...mapState('countAbout',['sum','school','subject']),
```

4. 开启命名空间后，组件中读取getters数据：
```javascript
//方式一：自己直接读取
this.$store.getters['personAbout/firstPersonName']
//方式二：借助mapGetters读取：
...mapGetters('countAbout',['bigSum'])
```

5. 开启命名空间后，组件中调用dispatch
```javascript
//方式一：自己直接dispatch
this.$store.dispatch('personAbout/addPersonWang',person)
//方式二：借助mapActions：
...mapActions('countAbout',{incrementOdd:'jiaOdd',incrementWait:'jiaWait'})
```

6. 开启命名空间后，组件中调用commit
```javascript
//方式一：自己直接commit
this.$store.commit('personAbout/ADD_PERSON',person)
//方式二：借助mapMutations：
...mapMutations('countAbout',{increment:'JIA',decrement:'JIAN'}),
```
**模块化**
```javascript
//求和相关配置
export default {
    namespaced: true,
    actions: {
        addOdd(context, value) {
            if (context.state.sum % 2) {
                context.commit('AddOdd', value)
            }
        },
        addWait(context, value) {
            setTimeout(() => {
                context.commit('AddWait', value)
            }, 1000)
        }
    },
    mutations: {
        Add(state, value) {
            state.sum += value
        },
        Reduce(state, value) {
            state.sum -= value
        },
        AddOdd(state, value) {
            state.sum += value
        },
        AddWait(state, value) {
            state.sum += value
        },
    },
    state: {
        sum: 0,
        school: 'B站大学',
        subject: '前端',
    },
    getters: {
        TenSum(state) {
            return state.sum * 10
        }
    }
}
```
```javascript
// 人员相关配置
import axios from 'axios'
import { nanoid } from 'nanoid'
export default  {
    namespaced: true,
    actions: {
        addPersongli(context, value) {
            if(value.name.indexOf('李') === 0) {
                context.commit('AddPerson', value)
            } else {
                alert('添加的人要姓李！')
            }
        },
        addPersonServer(context) {
            axios.get('https://api.uixsj.cn/hitokoto/get?type=social').then(
                response => {
                    context.commit('AddPerson', {id: nanoid(), name: response.data})
                },
                error => {
                    alert(error.message)
                }
            )
        }
    },
    mutations: {
        AddPerson(state, value) {
            state.personList.unshift(value)
        }
    },
    state: {
        personList: [{id: '001', name: '张三'}]
    },
    getters: {
        FirstPerson(state) {
            return state.personList[0].name
        }
    }
}
```
```javascript
// 该文件用于创建Vuex中最为核心的是store
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import countAbout from './countAbout'
import personAbout  from './personAbout'



// 创建并暴露store
export default new Vuex.Store({
    modules: {
        countAbout,
        personAbout
    }
})

```
```javascript
<template>
  <div>
    <h1>当前求和为：{{ sum }}</h1>
    <h3>Person组件的总人数为{{personList.length}}</h3>
    <h1>放大10倍为：{{ TenSum }}</h1>
    <h1>我在{{school}}学习{{subject}}</h1>
    <select v-model.number="n">
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
    </select>
    <button @click="increment(n)">+</button>
    <button @click="decrement(n)">-</button>
    <button @click="incrementOdd(n)">当前求和为奇数再加</button>
    <button @click="incrementWait(n)">等一等再加</button>
  </div>
</template>

<script>
import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
export default {
  name: "CountCom",
  data() {
    return {
      n: 1, //用户选择的数字
    };
  },
  methods: {
    
    ...mapMutations('countAbout', {increment:'Add', decrement: 'Reduce'} ),
    ...mapActions('countAbout', {incrementOdd: 'addOdd', incrementWait: 'addWait'})
  },
  computed: {
    ...mapState('countAbout', ['sum', 'school', 'subject']),
    ...mapState('personAbout', ['personList']),
    ...mapGetters('countAbout', {TenSum: 'TenSum'})
  },
};
</script>

<style>
button {
  margin: 5px;
}
</style>
```
```javascript
<template>
  <div>
    <h1>人员列表</h1>
    <h2>列表中第一人是：{{firstPerson}}</h2>
    <h3>Conunt组件的当前值为：{{ sum }}</h3>
    <input type="text" placeholder="请输入名字" v-model="name" />
    <button @click="addPerson">添加</button>
    <button @click='addpersonli'>添加一个姓李的人</button>
    <button @click='addPersonServer'>添加名字随机的人</button>
    <ul>
      <li v-for="person in personList" :key="person.id">
        {{ person.name }}
      </li>
    </ul>
  </div>
</template>

<script>
import { nanoid } from "nanoid";
import {mapState} from 'vuex'
export default {
  name: "PersonCom",
  data() {
    return {
      name: "",
    };
  },
  methods: {
    addPerson() {
      if (this.name === "") {
        alert("名字不能为空！");
      } else {
        const personObj = { id: nanoid(), name: this.name };
        this.$store.commit("personAbout/AddPerson", personObj);
        this.name = "";
      }
    },
    addpersonli() {
      const personObj = {id: nanoid(), name: this.name}
      this.$store.dispatch('personAbout/addPersongli', personObj)
      this.name = ''
    },
    addPersonServer() {
      this.$store.dispatch('personAbout/addPersonServer')
    }
  },
  computed: {
    /* personList() {
      return this.$store.state.personList;
      // 模块化后
      // return this.$store.state.personAbout.personList
    },
    sum() {
      return this.$store.state.sum;
    }, */
    ...mapState('personAbout', ['personList']),
    ...mapState('countAbout', ['sum']),
  firstPerson() {
    return this.$store.getters['personAbout/FirstPerson']
  }
  },
};
</script>

<style>
</style>
```
<a name="cZfhC"></a>
# 路由
**相关理解**<br />vue-router的理解

- vue的一个插件库，专门用来实现SPA应用

对SPA应用的理解

1. 单面Web应用(dingle page web application, SPA)
2. 整个应用只有一个完整的页面
3. 点击页面中的导航链接不会刷新页面，只会做页面的局部更新
4. 数据需要通过ajax请求获取

路由的理解

1. 什么是路由
- 一个路由（route）就是一组映射关系（key - value），多个路由需要路由器（router）进行管理。
- key为路径，value可能是function或component
2. 路由分类
- 后端路由
   - 理解：value是function，用于处理客户端提交的 请求
   - 工作过程：服务器收到一个请求时，根据请求路径找到匹配的函数来处理请求，返回响应数据
- 前端路由
   - 理解：value是component，用于展示页面内容
   - 工作过程：当浏览器的路径改变时，对应的组件就会显示
<a name="ZXFkL"></a>
### 基本使用

1. 安装vue-router，命令：npm i vue-router
2. 应用插件：Vue.use(VueRouter)
3. 编写router配置项:
```javascript
// 该文件用于创建整个应用的路由器
import VueRouter from 'vue-router'
// 引入组件
import About from '../components/About.vue'
import Home from '../components/Home.vue'

// 创建并暴露一个路由器
export default new VueRouter({
    routes: [
        {
            path: '/about',
            component: About
        },
        {
            path: '/home',
            component: Home
        }
    ]
})
```

4. 实现切换（active-class可配置高亮样式）
```javascript
<router-link class="list-group-item " active-class="active" to="/about">About</router-link>
```

5. 指定展示位置
```javascript
<router-view></router-view>
```
```javascript
// 导入组件模块
import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
// 引入路由器
import router from './router'
// 关闭生产提示
Vue.config.productionTip = false
Vue.use(VueRouter)

// 创建Vue实例
new Vue({
    el: "#app",
    router,
    render: h => h(App),

})
```
```javascript
// 该文件用于创建整个应用的路由器
import VueRouter from 'vue-router'
// 引入组件
import About from '../components/About.vue'
import Home from '../components/Home.vue'

// 创建并暴露一个路由器
export default new VueRouter({
    routes: [
        {
            path: '/about',
            component: About
        },
        {
            path: '/home',
            component: Home
        }
    ]
})
```
```javascript
<template>
  <div>
    <div class="row">
      <div class="col-xs-offset-2 col-xs-8">
        <div class="page-header"><h2>Vue Router Demo</h2></div>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-2 col-xs-offset-2">
        <div class="list-group">
          <!-- 原始html中使用a标签实现页面的跳转 -->
          <!-- <a class="list-group-item active" href="./about.html">About</a> -->
          <!-- <a class="list-group-item" href="./home.html">Home</a> -->

          <!-- Vue中借助router-link标签实现路由的切换 -->
          <router-link class="list-group-item " active-class="active" to="/about">About</router-link>
          <router-link class="list-group-item" active-class="active" to="/home">Home</router-link>
        </div>
      </div>
      <div class="col-xs-6">
        <div class="panel">
          <div class="panel-body">
          <!-- 指定组件的呈现位置 -->
            <router-view></router-view>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import Home from './components/Home.vue'
// import About from './components/About.vue'
export default {
  name: "App",
  components: {
    // Home,
    // About
  },
};
</script>

<style scoped>
</style>
```
```javascript
<template>
  <h2>我是Home的内容</h2>
</template>

<script>
export default {
    name: 'HomeCom'
}
</script>

<style>

</style>
```
```javascript
<template>
  <h2>我是About的内容</h2>
</template>

<script>
export default {
    name: 'AboutCom'
}
</script>

<style>

</style>
```
<a name="MByCC"></a>
### 几个注意点

1. 路由组件通常存放在pages文件夹，一般组件通常存放在components文件夹。
2. 通过切换，“隐藏”了的路由组件，默认是被销毁掉的，需要的时候再去挂载。
3. 每个组件都有自己的$route属性，里面存储着自己的路由信息。
4. 整个应用只有一个router，可以通过组件的$router属性获取到。
<a name="lvzhu"></a>
### 多级路由（嵌套路由）

1. 配置路由规则，使用children配置项：
```javascript
routes:[
	{
		path:'/about',
		component:About,
	},
	{
		path:'/home',
		component:Home,
		children:[ //通过children配置子级路由
			{
				path:'news', //此处一定不要写：/news
				component:News
			},
			{
				path:'message',//此处一定不要写：/message
				component:Message
			}
		]
	}
]
```

2. 跳转（要写完整路径）：

`<router-linkto="/home/news">News</router-link>`

3. 指定展示位置

`<router-view></router-view>`
<a name="e8XN4"></a>
### 路由的query参数

1. 传递参数
```javascript
<li v-for='m in messageList' :key='m.id'>
            <!-- 跳转路透并携带query参数，to的字符串写法 -->
            <!-- <router-link :to="`/home/message/detail?id=${m.id}&title=${m.title}`">{{m.title}}</router-link>&nbsp;&nbsp; -->
            <!-- 跳转路透并携带query参数，to的对象写法 -->
            <router-link :to="{
              path: '/home/message/detail',
              query: {
                id: m.id,
                title: m.title
              }
            }">
              {{m.title}}
            </router-link>
          </li>
```

2. 接收参数：
```javascript
<template>
  <ul>
    <li>消息编号：{{$route.query.id}}</li>
    <li>消息标题：{{$route.query.title}}</li>
  </ul>
</template>
```
<a name="kgNsn"></a>
### 命名路由

1. 作用：可以简化路由的跳转。
2. 如何使用
   1. 给路由命名：
```javascript
{
	path:'/demo',
	component:Demo,
	children:[
		{
			path:'test',
			component:Test,
			children:[
				{
                      name:'hello' //给路由命名
					path:'welcome',
					component:Hello,
				}
			]
		}
	]
}
```

   2. 简化跳转：
```javascript
<!--简化前，需要写完整的路径 -->
<router-link to="/demo/test/welcome">跳转</router-link>

<!--简化后，直接通过名字跳转 -->
<router-link :to="{name:'hello'}">跳转</router-link>

<!--简化写法配合传递参数 -->
<router-link 
	:to="{
		name:'hello',
		query:{
		   id:666,
            title:'你好'
		}
	}"
>跳转</router-link>
```
<a name="xXnJ0"></a>
### 路由的params参数

1. 配置路由，声明接收params参数
```javascript
{
	path:'/home',
	component:Home,
	children:[
		{
			path:'news',
			component:News
		},
		{
			component:Message,
			children:[
				{
					name:'xiangqing',
					path:'detail/:id/:title', //使用占位符声明接收params参数
					component:Detail
				}
			]
		}
	]
}
```

2. 传递参数
```javascript
<!-- 跳转并携带params参数，to的字符串写法 -->
<router-link :to="/home/message/detail/666/你好">跳转</router-link>
				
<!-- 跳转并携带params参数，to的对象写法 -->
<router-link 
	:to="{
		name:'xiangqing',
		params:{
		   id:666,
            title:'你好'
		}
	}"
>跳转</router-link>
```
**特别注意**：路由携带params参数时，若使用to的对象写法，则不能使用path配置项，必须使用name配置！

3. 接收参数
```javascript
$route.params.id
$route.params.title
```
<a name="npBf8"></a>
### 路由的props配置
作用：让路由组件更方便的收到参数
```javascript
// 第一种写法，值为对象，该对象中所有key-value都会以props的形式传给Detail组件
                            // props: {a: 1, b: 'hello'}

                            // 第二种写法,值为布尔值，就会把该路由器组件收到的所有params参数，以props的形式传给Detail组件
                            // props: true

                            // 第三种写法，值为函数
                            /* props($route) {
                                // return {id: 666, title: 123}
                                console.log($route)
                                return {id: $route.query.id, title: $route.query.title}
                            } */
                            // 解构赋值
                            /* props({query}) {
                                // return {id: 666, title: 123}
                                // console.log($route)
                                return {id: query.id, title: query.title}
                            } */
                            // 连续解构赋值
                            props({query: {id, title}}) {
                                // return {id: 666, title: 123}
                                // console.log($route)
                                return {id, title}
                            }
```
方便在要跳转去的组件里更简便的写法
```javascript
<template>
  <ul>
      <h1>Detail</h1>
      <li>消息编号：{{id}}</li>
      <li>消息标题：{{title}}</li>
      <li>a:{{a}}</li>
      <li>b:{{b}}</li>
  </ul>
</template>

<script>
export default {
    name: 'Detail',
    props: ['id', 'title', 'a', 'b'],
    mounted () {
        console.log(this.$route);
    }
}
</script>
```
<a name="fE77j"></a>
### <router-link>的replace属性

1. 作用：控制路由跳转时操作浏览器历史记录的模式
2. 浏览器的历史记录有两种写入方式：分别为push和replace，push是追加历史记录，replace是替换当前记录。路由跳转时候默认为push
3. 如何开启replace模式：<router-link replace .......>News</router-link>
<a name="ANOIp"></a>
### 编程式路由导航

1. 作用：不借助<router-link> 实现路由跳转，让路由跳转更加灵活
2. 具体编码：
```javascript
//$router的两个API
this.$router.push({
	name:'xiangqing',
		params:{
			id:xxx,
			title:xxx
		}
})

this.$router.replace({
	name:'xiangqing',
		params:{
			id:xxx,
			title:xxx
		}
})
this.$router.forward() //前进
this.$router.back() //后退
this.$router.go() //可前进也可后退
```
<a name="iKsst"></a>
### 缓存路由组件

1. 作用：让不展示的路由组件保持挂载，不被销毁。
2. 具体编码：
- 这个 include 指的是组件名, name 属性
```javascript
<keep-alive include="NewsCom">  //多个可以写数组形式
    <router-view></router-view>
</keep-alive>
```
<a name="lqJRh"></a>
### 两个新的生命周期钩子
作用：路由组件所独有的两个钩子，用于捕获路由组件的激活状态。<br />具体名字：

- activated路由组件被激活时触发。
- deactivated路由组件失活时触发。

这两个生命周期钩子需要配合前面的缓存路由组件使用（没有缓存路由组件不起效果）
```javascript
activated() {
    console.log("News组件被激活了")
    this.timer = setInterval(() => {
      console.log('@')
      this.opacity -= 0.01
      if(this.opacity <= 0) this.opacity = 1
    }, 16)
  },
  deactivated() {
    console.log("News组件失活了")
    clearInterval(this.timer)
  }
```
<a name="v9yGm"></a>
### 路由守卫

1. 作用：对路由进行权限控制
2. 分类：全局守卫、独享守卫、组件内守卫
3. 全局守卫:
```javascript
//全局前置守卫：初始化时执行、每次路由切换前执行
router.beforeEach((to,from,next)=>{
	console.log('beforeEach',to,from)
	if(to.meta.isAuth){ //判断当前路由是否需要进行权限控制
		if(localStorage.getItem('school') === 'zhejiang'){ //权限控制的具体规则
			next() //放行
		}else{
			alert('暂无权限查看')
			// next({name:'guanyu'})
		}
	}else{
		next() //放行
	}
})

//全局后置守卫：初始化时执行、每次路由切换后执行
router.afterEach((to,from)=>{
	console.log('afterEach',to,from)
	if(to.meta.title){ 
		document.title = to.meta.title //修改网页的title
	}else{
		document.title = 'vue_test'
	}
})
```

4. 独享守卫

就是在 routes 子路由内写守卫<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/32917541/1676022145457-47f8d6f3-5629-47b5-a2da-6acdad1930bc.png#averageHue=%23282d35&clientId=u9a41ef60-4461-4&from=paste&id=u7dba3585&name=image.png&originHeight=770&originWidth=690&originalType=url&ratio=1&rotation=0&showTitle=false&size=61566&status=done&style=none&taskId=u6f7b3a45-a568-4fcc-86b1-6591f5cf322&title=)

5. 组件内守卫

在具体组件内写守卫
```javascript
<template>
  <h2>我是About的内容</h2>
</template>

<script>
export default {
    name: 'AboutCom',
    /* mounted() {
      console.log('About组件挂载完毕')
    },
    beforeDestroy() {
      console.log('About组件即将销毁')
    }, */

    // 通过路由规则进入该组件时被调用
    beforeRouteEnter (to, from, next) {
      // ...
      if(to.meta.isAuth) {
        if(localStorage.getItem('name') === "Leah") {
          next()
        } else {
          alert('你的权限不够！')
        }
      }else {
        next()
      }
    },

    // 通过路由规则，离开时该组件被调用
    beforeRouteLeave(to, from, next) {
      // console.log('About--beforeRouterLeave', to, from)
      next()
    }
}
</script>
```
<a name="AOHbJ"></a>
### 路由器的两种工作模式

1. 对于一个url来说，什么是hash值？—— #及其后面的内容就是hash值。
2. hash值不会包含在 HTTP 请求中，即：hash值不会带给服务器。
3. hash模式：
   1. 地址中永远带着#号，不美观 。
   2. 若以后将地址通过第三方手机app分享，若app校验严格，则地址会被标记为不合法。
   3. 兼容性较好。
4. history模式：
   1. 地址干净，美观 。
   2. 兼容性和hash模式相比略差。
   3. 应用部署上线时需要后端人员支持，解决刷新页面服务端404的问题。

![image.png](https://cdn.nlark.com/yuque/0/2023/png/32917541/1676027217148-060b0b35-f175-4e7e-b5f8-db83c7b6f21e.png#averageHue=%23292d36&clientId=u9a41ef60-4461-4&from=paste&id=u5756aab9&name=image.png&originHeight=426&originWidth=671&originalType=url&ratio=1&rotation=0&showTitle=false&size=48190&status=done&style=none&taskId=uce3f9f03-a545-4eb6-9226-c07afe2638e&title=)

 

