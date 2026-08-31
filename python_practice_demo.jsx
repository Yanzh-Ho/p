const { useState, useEffect, useRef, useCallback } = React;

const FONTS_LINK_ID = "py-notebook-fonts";

const TOPICS = [
  {
    stage: "第一階段 · 入門基礎",
    id: "1-1",
    tag: "1-1",
    title: "你好，Python",
    note: "print() 是 Python 用來「說話」的方式。放進括號裡的文字要用引號包起來，Python 才知道那是要顯示的文字，不是指令本身。",
    task: "修改下面的程式碼，讓它印出「Hello, Python!」（大小寫、標點都要一樣）。",
    starter: `print("Hello, World!")`,
    expected: "Hello, Python!",
    hint: '把引號裡的文字改成 "Hello, Python!" 就好，其他都不用動。',
  },
  {
    stage: "第一階段 · 入門基礎",
    id: "1-2",
    tag: "1-2",
    title: "變數與型別",
    note: "變數就像一個貼了標籤的箱子，把值放進去之後，之後可以用箱子的名字（變數名）把值拿出來用，不用重複打一次。",
    task: "建立一個變數 age，設成 18，然後印出 age 的值。",
    starter: `age = 0\nprint(age)`,
    expected: "18",
    hint: "把 age = 0 的 0 改成 18 即可。",
  },
  {
    stage: "第一階段 · 入門基礎",
    id: "1-3",
    tag: "1-3",
    title: "字串操作：長度",
    note: "字串也有自己的「長度」。len() 這個函式可以幫你算出一個字串裡總共有幾個字元。",
    task: "已經有一個字串 name = \"Python\"，請印出它的長度。",
    starter: `name = "Python"\nprint(name)`,
    expected: "6",
    hint: "把 print(name) 改成 print(len(name))。",
  },
  {
    stage: "第一階段 · 入門基礎",
    id: "1-4",
    tag: "1-4",
    title: "運算子",
    note: "算術運算子（+ - * /）可以直接對數字做運算，結果也可以存進一個新的變數裡。",
    task: "計算 a、b、c 三個數字的平均值，並印出結果。",
    starter: `a = 7\nb = 8\nc = 9\naverage = 0\nprint(average)`,
    expected: "8.0",
    hint: "average = (a + b + c) / 3",
  },
  {
    stage: "第一階段 · 入門基礎",
    id: "1-5",
    tag: "1-5",
    title: "字串方法",
    note: "字串內建很多好用的方法，例如 .upper() 可以把字串全部轉成大寫。",
    task: "印出 word 的全大寫版本。",
    starter: `word = "python"\nprint(word)`,
    expected: "PYTHON",
    hint: "print(word.upper())",
  },
  {
    stage: "第一階段 · 入門基礎",
    id: "1-6",
    tag: "1-6",
    title: "總複習：個人資料卡",
    note: "f-string（f\"...{變數}...\"）可以很方便地把變數的值直接嵌進一段文字裡。",
    task: "用 f-string 印出「小明，20歲」這個格式。",
    starter: `name = "小明"\nage = 20\nprint(name)`,
    expected: "小明，20歲",
    hint: 'print(f"{name}，{age}歲")',
  },
  {
    stage: "第一階段 · 入門基礎",
    id: "1-7",
    tag: "1-7",
    title: "數字格式化",
    note: "f-string 裡的變數後面可以加上「:.2f」這種格式規格，控制小數點要顯示到第幾位。",
    task: "用 f-string 印出 pi 到小數點後兩位。",
    starter: `pi = 3.14159\nprint(pi)`,
    expected: "3.14",
    hint: 'print(f"{pi:.2f}")',
  },
  {
    stage: "第一階段 · 入門基礎",
    id: "1-8",
    tag: "1-8",
    title: "字串分割與組合",
    note: "split() 可以把字串拆成一個 list，join() 則相反，能把 list 組回一個字串，兩者常常搭配使用。",
    task: "把 csv 這個逗號分隔字串轉換成用「/」分隔的格式（結果存進 result）。",
    starter: `csv = "apple,banana,cherry"\nparts = csv.split(",")\nresult = csv\nprint(result)`,
    expected: "apple/banana/cherry",
    hint: 'result = "/".join(parts)',
  },
  {
    stage: "第一階段 · 入門基礎",
    id: "1-9",
    tag: "1-9",
    title: "型別轉換",
    note: "字串型態的數字沒辦法直接做數學運算（+ 會變成字串接接），要先用 int() 或 float() 轉換成數字型別。",
    task: "修正這段程式碼，讓兩個字串型態的數字正確相加成數字 30，而不是接成字串。",
    starter: `a = "10"\nb = "20"\ntotal = a + b\nprint(total)`,
    expected: "30",
    hint: "total = int(a) + int(b)",
  },
  {
    stage: "第一階段 · 入門基礎",
    id: "1-10",
    tag: "1-10",
    title: "總複習：格式化報表",
    note: "把 f-string、格式規格、字串組合這幾招放在一起用，就能整理出一份好讀的報表輸出。",
    task: "用 f-string 印出「小明的成績：92.50分」（分數要留到小數點後兩位）。",
    starter: `name = "小明"\nscore = 92.5\nprint(name)`,
    expected: "小明的成績：92.50分",
    hint: 'print(f"{name}的成績：{score:.2f}分")',
  },
  {
    stage: "第二階段 · 邏輯建構",
    id: "2-1",
    tag: "2-1",
    title: "條件判斷基礎",
    note: "if 只處理「條件成立」的情況；如果也想處理「條件不成立」的情況，需要加上 else。",
    task: "幫這段程式加上 else，讓分數不及格（低於60）時印出「不及格」。",
    starter: `score = 45\nif score >= 60:\n    print("及格")`,
    expected: "不及格",
    hint: '在 print("及格") 下一行加上：\nelse:\n    print("不及格")',
  },
  {
    stage: "第二階段 · 邏輯建構",
    id: "2-2",
    tag: "2-2",
    title: "條件判斷進階",
    note: "and、or、not 可以把多個條件組合在一起。and 兩邊都要成立，or 只要一邊成立即可。",
    task: "改成「num 是 5 的倍數，而且不是 10 的倍數」才印出「符合」。",
    starter: `num = 15\nif num % 5 == 0:\n    print("符合")\nelse:\n    print("不符合")`,
    expected: "符合",
    hint: "if num % 5 == 0 and not num % 10 == 0:",
  },
  {
    stage: "第二階段 · 邏輯建構",
    id: "2-3",
    tag: "2-3",
    title: "for 迴圈",
    note: "range(起點, 終點) 會產生一連串數字，但不包含終點那個數字本身。",
    task: "修改 range()，讓迴圈印出 1 到 5（包含5）。",
    starter: `for i in range(1, 5):\n    print(i)`,
    expected: "1\n2\n3\n4\n5",
    hint: "range 的終點要寫成 6，因為 range 不包含終點：range(1, 6)",
  },
  {
    stage: "第二階段 · 邏輯建構",
    id: "2-4",
    tag: "2-4",
    title: "while 迴圈",
    note: "while 迴圈會不斷檢查條件，只要條件是 True 就會一直執行，所以務必記得讓條件會隨著執行而改變。",
    task: "修改條件，讓它只印出 3、2、1（不要印出 0）。",
    starter: `n = 3\nwhile n >= 0:\n    print(n)\n    n -= 1`,
    expected: "3\n2\n1",
    hint: "把 n >= 0 改成 n > 0。",
  },
  {
    stage: "第二階段 · 邏輯建構",
    id: "2-5",
    tag: "2-5",
    title: "串列 List",
    note: "串列（list）的索引從 0 開始算，所以第一個元素是 [0]，第二個是 [1]，以此類推。",
    task: "印出串列中的第二個元素（banana）。",
    starter: `fruits = ["apple", "banana", "cherry"]\nprint(fruits[0])`,
    expected: "banana",
    hint: "把索引 0 改成 1：print(fruits[1])",
  },
  {
    stage: "第二階段 · 邏輯建構",
    id: "2-6",
    tag: "2-6",
    title: "字典 Dict",
    note: "字典用 key 來取出對應的 value，格式是 字典名稱[\"key\"]。",
    task: "印出 contact 的電話號碼，而不是名字。",
    starter: `contact = {"name": "小華", "phone": "0912345678"}\nprint(contact["name"])`,
    expected: "0912345678",
    hint: 'print(contact["phone"])',
  },
  {
    stage: "第二階段 · 邏輯建構",
    id: "2-7",
    tag: "2-7",
    title: "集合與元組",
    note: "set() 可以把一個串列轉成集合，自動去除重複的元素。",
    task: "算出 numbers 去除重複後還剩幾個不同的數字。",
    starter: `numbers = [1, 2, 2, 3, 3, 3]\nunique_numbers = numbers\nprint(len(unique_numbers))`,
    expected: "3",
    hint: "unique_numbers = set(numbers)",
  },
  {
    stage: "第二階段 · 邏輯建構",
    id: "2-8",
    tag: "2-8",
    title: "總複習：小小庫存計算",
    note: "sum() 可以直接把一個數字串列全部加總，不用自己寫迴圈。",
    task: "印出 prices 裡所有價格的總和。",
    starter: `prices = [10, 20, 30]\ntotal = 0\nprint(total)`,
    expected: "60",
    hint: "total = sum(prices)",
  },
  {
    stage: "第二階段 · 邏輯建構",
    id: "2-9",
    tag: "2-9",
    title: "巢狀迴圈",
    note: "迴圈裡面還可以再放一層迴圈：外層每跑一次，內層就會整個跑完一輪，常用來處理表格式的資料。",
    task: "印出一個 3x3 的星號方陣，總共 3 行，每行都要有 3 個星號。",
    starter: `for i in range(3):\n    print("*")`,
    expected: "***\n***\n***",
    hint: '把 print("*") 改成 print("*" * 3)',
  },
  {
    stage: "第二階段 · 邏輯建構",
    id: "2-10",
    tag: "2-10",
    title: "List Comprehension",
    note: "串列生成式可以同時做「篩選」和「轉換」：先用 if 篩選符合條件的元素，再對它做運算放進新串列。",
    task: "建立一個新串列 result，內容是 nums 裡所有偶數的平方。",
    starter: `nums = [1, 2, 3, 4, 5, 6]\nresult = nums\nprint(result)`,
    expected: "[4, 16, 36]",
    hint: "result = [n * n for n in nums if n % 2 == 0]",
  },
  {
    stage: "第二階段 · 邏輯建構",
    id: "2-11",
    tag: "2-11",
    title: "字典計數",
    note: "迴圈搭配字典是很常見的「計數」寫法：用 .get(key, 0) 拿目前累計的次數（不存在就當 0），再 +1 存回去。",
    task: "統計 text 這個字串中每個字元各出現幾次，存進 counts 字典。",
    starter: `text = "banana"\ncounts = {}\nprint(counts)`,
    expected: "{'b': 1, 'a': 3, 'n': 2}",
    hint: 'for ch in text:\n    counts[ch] = counts.get(ch, 0) + 1',
  },
  {
    stage: "第二階段 · 邏輯建構",
    id: "2-12",
    tag: "2-12",
    title: "總複習：巢狀資料統計",
    note: "把迴圈、list comprehension、條件判斷組合起來，是資料處理最常見的基本功。",
    task: "從 records（一堆 (姓名, 分數) 組成的 tuple 串列）裡，算出「及格人數」（60分以上，含60分）。",
    starter: `records = [("小明", 85), ("小美", 40), ("小華", 60), ("阿凱", 55)]\npass_count = 0\nprint(pass_count)`,
    expected: "2",
    hint: "pass_count = len([s for name, s in records if s >= 60])",
  },
  {
    stage: "第三階段 · 程式模組化",
    id: "3-1",
    tag: "3-1",
    title: "函式基礎",
    note: "函式用 def 定義，可以把重複要做的事包起來。return 負責把結果送回去給呼叫的地方。",
    task: "讓 square 函式回傳 n 的平方。",
    starter: `def square(n):\n    return 0\n\nprint(square(5))`,
    expected: "25",
    hint: "return n * n",
  },
  {
    stage: "第三階段 · 程式模組化",
    id: "3-2",
    tag: "3-2",
    title: "函式進階：預設參數",
    note: "函式的參數可以設定預設值，呼叫時如果沒給該參數，就會用預設值。",
    task: "把預設招呼語改成「哈囉」，讓 greet(\"小明\") 印出「哈囉，小明」。",
    starter: `def greet(name, greeting="Hi"):\n    print(greeting + "，" + name)\n\ngreet("小明")`,
    expected: "哈囉，小明",
    hint: '把 greeting="Hi" 改成 greeting="哈囉"',
  },
  {
    stage: "第三階段 · 程式模組化",
    id: "3-3",
    tag: "3-3",
    title: "變數作用域",
    note: "函式裡如果要修改函式外面（全域）的變數，需要用 global 關鍵字先宣告，不然 Python 會當它是新的區域變數。",
    task: "修正 add_one，讓它能正確修改全域變數 count。",
    starter: `count = 0\n\ndef add_one():\n    count = count + 1\n\nadd_one()\nprint(count)`,
    expected: "1",
    hint: "在函式的第一行加上：global count",
  },
  {
    stage: "第三階段 · 程式模組化",
    id: "3-4",
    tag: "3-4",
    title: "錯誤處理",
    note: "try/except 可以攔截程式執行時發生的錯誤，避免整個程式當掉，還能決定發生錯誤時要怎麼處理。",
    task: "用 try/except 攔截除以零的錯誤，讓函式回傳「無法除以零」。",
    starter: `def safe_divide(a, b):\n    return a / b\n\nprint(safe_divide(10, 0))`,
    expected: "無法除以零",
    hint: '把函式內容改成：\ntry:\n    return a / b\nexcept ZeroDivisionError:\n    return "無法除以零"',
  },
  {
    stage: "第三階段 · 程式模組化",
    id: "3-5",
    tag: "3-5",
    title: "模組與套件",
    note: "import 可以載入 Python 內建的標準函式庫，例如 math 模組裡有很多數學相關的函式。",
    task: "印出 16 的平方根。",
    starter: `import math\n\nprint(math.sqrt(0))`,
    expected: "4.0",
    hint: "math.sqrt(16)",
  },
  {
    stage: "第三階段 · 程式模組化",
    id: "3-6",
    tag: "3-6",
    title: "總複習：安全的平均值函式",
    note: "寫函式時要多想「異常狀況」，例如串列是空的時候，直接除法會出錯，要先判斷再處理。",
    task: "修改 average 函式，串列是空的時候回傳 0，而不是造成錯誤。",
    starter: `def average(numbers):\n    return sum(numbers) / len(numbers)\n\nprint(average([]))`,
    expected: "0",
    hint: "在函式開頭加上：\nif len(numbers) == 0:\n    return 0",
  },
  {
    stage: "第三階段 · 程式模組化",
    id: "3-7",
    tag: "3-7",
    title: "遞迴函式",
    note: "遞迴函式會在裡面呼叫自己，並且一定要有「終止條件」（base case）讓它停下來，例如階乘 n! = n × (n-1)!。",
    task: "修正 factorial，讓它用遞迴正確算出 5 的階乘（5! = 120）。",
    starter: `def factorial(n):\n    if n == 0:\n        return 1\n    return n\n\nprint(factorial(5))`,
    expected: "120",
    hint: "把 return n 改成：return n * factorial(n - 1)",
  },
  {
    stage: "第三階段 · 程式模組化",
    id: "3-8",
    tag: "3-8",
    title: "高階函式：map",
    note: "map() 可以對串列裡的每一個元素套用同一個函式（例如用 lambda 寫的匿名函式），要用 list() 包起來才能看到結果。",
    task: "用 map 把 nums 裡每個數字都乘以 10，結果存進 result。",
    starter: `nums = [1, 2, 3]\nresult = nums\nprint(result)`,
    expected: "[10, 20, 30]",
    hint: "result = list(map(lambda n: n * 10, nums))",
  },
  {
    stage: "第三階段 · 程式模組化",
    id: "3-9",
    tag: "3-9",
    title: "可變參數 *args",
    note: "函式參數前面加一個 *，可以讓它接收任意數量的參數，這些參數會被打包成一個 tuple。",
    task: "讓 total 函式可以接收任意數量的數字，並回傳它們的總和。",
    starter: `def total(*numbers):\n    return 0\n\nprint(total(1, 2, 3, 4))`,
    expected: "10",
    hint: "return sum(numbers)",
  },
  {
    stage: "第三階段 · 程式模組化",
    id: "3-10",
    tag: "3-10",
    title: "裝飾器基礎",
    note: "裝飾器（decorator）是一個「包住」另一個函式的函式，可以在不改動原本函式內容的情況下，額外加上一些行為。",
    task: "完成 shout 這個裝飾器，讓它把 func() 的回傳值轉成全大寫再送出去。",
    starter: `def shout(func):\n    def wrapper():\n        result = func()\n        return result\n    return wrapper\n\n@shout\ndef greet():\n    return "hello"\n\nprint(greet())`,
    expected: "HELLO",
    hint: "把 return result 改成：return result.upper()",
  },
  {
    stage: "第三階段 · 程式模組化",
    id: "3-11",
    tag: "3-11",
    title: "總複習：函式工具箱整合",
    note: "把 try/except 放進迴圈裡，可以讓程式在遇到某一筆資料出錯時「跳過它」，而不是讓整個程式當掉。",
    task: "完成 safe_apply，讓它對 nums 裡每個數字套用 func，如果套用時發生任何錯誤（例如除以零），就跳過該項目，不要放進結果。",
    starter: `def safe_apply(func, nums):\n    result = []\n    for n in nums:\n        result.append(func(n))\n    return result\n\nprint(safe_apply(lambda x: 10 // x, [5, 0, 2]))`,
    expected: "[2, 5]",
    hint: "把 for 迴圈裡的那行包進 try/except：\ntry:\n    result.append(func(n))\nexcept Exception:\n    pass",
  },
  {
    stage: "第四階段 · 物件導向與進階",
    id: "4-1",
    tag: "4-1",
    title: "類別與物件基礎",
    note: "class 是物件的藍圖，__init__ 會在建立物件時自動執行，通常用來把傳進來的值存到 self 上。",
    task: "讓 __init__ 正確把傳入的 name 存到 self.name。",
    starter: `class Student:\n    def __init__(self, name):\n        self.name = ""\n\ns = Student("小美")\nprint(s.name)`,
    expected: "小美",
    hint: "self.name = name",
  },
  {
    stage: "第四階段 · 物件導向與進階",
    id: "4-2",
    tag: "4-2",
    title: "方法與封裝",
    note: "類別裡的函式叫做方法（method），第一個參數 self 代表物件自己，可以透過它讀寫物件的屬性。",
    task: "讓 deposit 方法把 amount 加進 self.balance。",
    starter: `class BankAccount:\n    def __init__(self, balance):\n        self.balance = balance\n\n    def deposit(self, amount):\n        pass\n\naccount = BankAccount(100)\naccount.deposit(50)\nprint(account.balance)`,
    expected: "150",
    hint: "把 pass 換成：self.balance = self.balance + amount",
  },
  {
    stage: "第四階段 · 物件導向與進階",
    id: "4-3",
    tag: "4-3",
    title: "繼承",
    note: "子類別（例如 Dog）括號裡放父類別（Animal）名稱就會繼承它，也可以覆寫父類別的方法變成自己的版本。",
    task: "讓 Dog 的 speak 方法回傳「汪汪！」。",
    starter: `class Animal:\n    def __init__(self, name):\n        self.name = name\n\n    def speak(self):\n        return "..."\n\nclass Dog(Animal):\n    def speak(self):\n        return "..."\n\nd = Dog("小黑")\nprint(d.speak())`,
    expected: "汪汪！",
    hint: 'return "汪汪！"',
  },
  {
    stage: "第四階段 · 物件導向與進階",
    id: "4-4",
    tag: "4-4",
    title: "多型與特殊方法",
    note: "__str__ 是特殊方法，決定 print(物件) 的時候要顯示什麼內容，可以用 f-string 把屬性組合進去。",
    task: "讓 __str__ 回傳「(3, 4)」這樣的格式。",
    starter: `class Point:\n    def __init__(self, x, y):\n        self.x = x\n        self.y = y\n\n    def __str__(self):\n        return "Point"\n\np = Point(3, 4)\nprint(p)`,
    expected: "(3, 4)",
    hint: 'return f"({self.x}, {self.y})"',
  },
  {
    stage: "第四階段 · 物件導向與進階",
    id: "4-5",
    tag: "4-5",
    title: "檔案讀寫",
    note: "open() 搭配 with 語法可以安全地讀寫檔案，寫入用 \"w\" 模式，讀取用 \"r\" 模式，f.read() 會拿到整個檔案內容。",
    task: "讓 content 讀到檔案裡寫入的內容。",
    starter: `with open("note.txt", "w") as f:\n    f.write("Hello")\n\nwith open("note.txt", "r") as f:\n    content = ""\n\nprint(content)`,
    expected: "Hello",
    hint: "content = f.read()",
  },
  {
    stage: "第四階段 · 物件導向與進階",
    id: "4-6",
    tag: "4-6",
    title: "常用標準庫：json",
    note: "json.dumps() 可以把 Python 的字典轉成 JSON 格式的字串，方便存檔或跟其他程式交換資料。",
    task: "用 json.dumps 把 data 轉成 JSON 字串（加上 ensure_ascii=False 讓中文正常顯示）。",
    starter: `import json\n\ndata = {"name": "小明", "age": 18}\njson_str = ""\nprint(json_str)`,
    expected: '{"name": "小明", "age": 18}',
    hint: "json_str = json.dumps(data, ensure_ascii=False)",
  },
  {
    stage: "第四階段 · 物件導向與進階",
    id: "4-7",
    tag: "4-7",
    title: "總複習：圖書借閱",
    note: "一個物件的狀態（例如有沒有被借走）可以用屬性紀錄，再用不同方法去改變這個狀態。",
    task: "讓 return_book 方法把 borrowed 設回 False。",
    starter: `class Book:\n    def __init__(self, title):\n        self.title = title\n        self.borrowed = False\n\n    def borrow(self):\n        self.borrowed = True\n\n    def return_book(self):\n        pass\n\nbook = Book("Python入門")\nbook.borrow()\nbook.return_book()\nprint(book.borrowed)`,
    expected: "False",
    hint: "self.borrowed = False",
  },
  {
    stage: "第四階段 · 物件導向與進階",
    id: "4-8",
    tag: "4-8",
    title: "類別變數 vs 實例變數",
    note: "定義在 class 內、__init__ 外面的變數是「類別變數」，所有物件共用；用 self.xxx 建立的則是每個物件各自獨立的「實例變數」。",
    task: "修正 __init__，讓每次建立新物件時，都能正確把「類別變數」total 加 1（不要不小心建立成該物件自己的實例變數）。",
    starter: `class Counter:\n    total = 0\n    def __init__(self):\n        self.total += 1\n\nCounter()\nCounter()\nc3 = Counter()\nprint(Counter.total)`,
    expected: "3",
    hint: "把 self.total += 1 改成：Counter.total += 1",
  },
  {
    stage: "第四階段 · 物件導向與進階",
    id: "4-9",
    tag: "4-9",
    title: "@staticmethod",
    note: "@staticmethod 定義的方法不需要 self，用起來就像放在類別裡的一般函式，適合寫「跟類別有關、但不需要存取物件自身資料」的工具函式。",
    task: "完成 is_even 這個 staticmethod，判斷傳入的數字是不是偶數。",
    starter: `class MathTool:\n    @staticmethod\n    def is_even(n):\n        return n\n\nprint(MathTool.is_even(4))`,
    expected: "True",
    hint: "return n % 2 == 0",
  },
  {
    stage: "第四階段 · 物件導向與進階",
    id: "4-10",
    tag: "4-10",
    title: "多型 Polymorphism",
    note: "不同類別可以有同名的方法，即使不知道物件實際上是哪個類別，呼叫同一個方法名稱時，Python 就會自動執行那個類別自己的版本，這就是多型。",
    task: "完成 Cat 的 speak 方法，讓牠回傳「喵喵！」，讓迴圈能依序印出每種動物的叫聲。",
    starter: `class Animal:\n    def speak(self):\n        return "..."\n\nclass Dog(Animal):\n    def speak(self):\n        return "汪汪！"\n\nclass Cat(Animal):\n    def speak(self):\n        return "..."\n\nanimals = [Dog(), Cat()]\nfor a in animals:\n    print(a.speak())`,
    expected: "汪汪！\n喵喵！",
    hint: '把 Cat 的 return "..." 改成：return "喵喵！"',
  },
  {
    stage: "第四階段 · 物件導向與進階",
    id: "4-11",
    tag: "4-11",
    title: "運算子重載 __eq__",
    note: "__eq__ 這個特殊方法可以自訂「兩個物件用 == 比較時」該怎麼判斷相等，預設是比較記憶體位置，通常不是我們真正想要的結果。",
    task: "完成 __eq__，讓兩個 Point 物件只要 x、y 座標都相同，就視為相等。",
    starter: `class Point:\n    def __init__(self, x, y):\n        self.x = x\n        self.y = y\n    def __eq__(self, other):\n        return False\n\np1 = Point(1, 2)\np2 = Point(1, 2)\nprint(p1 == p2)`,
    expected: "True",
    hint: "return self.x == other.x and self.y == other.y",
  },
  {
    stage: "第四階段 · 物件導向與進階",
    id: "4-12",
    tag: "4-12",
    title: "總複習：小型物件模型",
    note: "把類別、方法、運算整合起來，就能描述一個有狀態、有行為的完整物件模型，這是物件導向設計最基本的能力。",
    task: "完成 pay_raise 方法，讓它把 salary 依傳入的百分比調漲（例如 10 代表調漲 10%），並回傳調整後、四捨五入到整數的薪水。",
    starter: `class Employee:\n    def __init__(self, name, salary):\n        self.name = name\n        self.salary = salary\n\n    def pay_raise(self, percent):\n        return self.salary\n\ne = Employee("小陳", 30000)\nnew_salary = e.pay_raise(10)\nprint(new_salary)`,
    expected: "33000",
    hint: "return round(self.salary * (1 + percent / 100))",
  },
  {
    stage: "第五階段 · 實戰專案",
    id: "5-1",
    tag: "5-1",
    title: "專案規劃：資料思維暖身",
    note: "動手做專案前，先練習把「一堆數字」變成「有意義的結論」，這是資料處理類專案最基本的能力。",
    task: "算出 scores 這份成績清單的平均分。",
    starter: `scores = [88, 92, 79, 95]\naverage = 0\nprint(average)`,
    expected: "88.5",
    hint: "average = sum(scores) / len(scores)",
  },
  {
    stage: "第五階段 · 實戰專案",
    id: "5-2",
    tag: "5-2",
    title: "資料處理路線：篩選資料",
    note: "串列生成式（list comprehension）可以用一行程式碼，從一份資料裡篩選出符合條件的部分，是資料處理很常用的寫法。",
    task: "篩選出 scores 裡所有 90 分以上的成績。",
    starter: `scores = [88, 92, 79, 95, 91]\nhigh_scores = []\nprint(high_scores)`,
    expected: "[92, 95, 91]",
    hint: "high_scores = [s for s in scores if s >= 90]",
  },
  {
    stage: "第五階段 · 實戰專案",
    id: "5-3",
    tag: "5-3",
    title: "爬蟲路線：從文字中擷取資料",
    note: "網頁爬蟲很多時候就是在一大段文字裡，找出你要的那一小段。這裡先用字串切片練習這個概念。",
    task: "用切片取出 start 到 end 之間的文字。",
    starter: `html = "<h1>今日金句：學而時習之</h1>"\nstart = html.find("：") + 1\nend = html.find("</h1>")\nquote = ""\nprint(quote)`,
    expected: "學而時習之",
    hint: "quote = html[start:end]",
  },
  {
    stage: "第五階段 · 實戰專案",
    id: "5-4",
    tag: "5-4",
    title: "遊戲開發路線：猜數字邏輯",
    note: "遊戲的核心常常就是一連串的條件判斷，猜數字遊戲需要區分「太大、太小、猜對」三種情況。",
    task: "修正 else 分支，guess 比 secret 小的時候應該印出「太小了」。",
    starter: `secret = 7\nguess = 5\n\nif guess == secret:\n    result = "猜對了"\nelif guess > secret:\n    result = "太大了"\nelse:\n    result = "猜對了"\n\nprint(result)`,
    expected: "太小了",
    hint: '把 else 裡的 "猜對了" 改成 "太小了"',
  },
  {
    stage: "第五階段 · 實戰專案",
    id: "5-5",
    tag: "5-5",
    title: "總複習：專案收尾",
    note: "做完一個功能後，回頭把它包成一個乾淨的函式，是專案收尾、方便展示成果的好習慣。",
    task: "讓 total_score 函式回傳 scores 的加總。",
    starter: `def total_score(scores):\n    return 0\n\nscores = [10, 20, 30]\nprint(total_score(scores))`,
    expected: "60",
    hint: "return sum(scores)",
  },
  {
    stage: "第五階段 · 實戰專案",
    id: "5-6",
    tag: "5-6",
    title: "資料分組彙總",
    note: "用字典把資料依某個欄位分組、累加，是資料分析裡最常見的第一步，通常會搭配 .get(key, 0) 來累加金額或次數。",
    task: "把 sales 這份 (品項, 金額) 資料，依品項加總成 totals 字典。",
    starter: `sales = [("咖啡", 120), ("茶", 80), ("咖啡", 150), ("茶", 60)]\ntotals = {}\nprint(totals)`,
    expected: "{'咖啡': 270, '茶': 140}",
    hint: 'for item, amount in sales:\n    totals[item] = totals.get(item, 0) + amount',
  },
  {
    stage: "第五階段 · 實戰專案",
    id: "5-7",
    tag: "5-7",
    title: "排序演算法：氣泡排序",
    note: "氣泡排序透過重複比較「相鄰兩個元素」，把較大的往後移，跑完所有回合後整個串列就由小到大排好了。",
    task: "修正氣泡排序的比較條件，讓 nums 變成由小到大排序（目前的條件會排成由大到小）。",
    starter: `nums = [5, 2, 8, 1, 9]\nn = len(nums)\nfor i in range(n):\n    for j in range(n - 1):\n        if nums[j] < nums[j + 1]:\n            nums[j], nums[j + 1] = nums[j + 1], nums[j]\nprint(nums)`,
    expected: "[1, 2, 5, 8, 9]",
    hint: "把 if nums[j] < nums[j + 1] 的 < 改成 >",
  },
  {
    stage: "第五階段 · 實戰專案",
    id: "5-8",
    tag: "5-8",
    title: "正規表達式基礎",
    note: "re 模組的 findall() 可以用「模式」在一段文字裡找出所有符合的部分，\\d+ 代表「連續一個或多個數字」。",
    task: "用正規表達式找出 text 裡所有的數字，存進 numbers 串列。",
    starter: `import re\ntext = "訂單編號A102，數量5個，單價250元"\nnumbers = []\nprint(numbers)`,
    expected: "['102', '5', '250']",
    hint: 'numbers = re.findall(r"\\d+", text)',
  },
  {
    stage: "第五階段 · 實戰專案",
    id: "5-9",
    tag: "5-9",
    title: "終極整合：任務管理器",
    note: "這一題把類別、字典、串列生成式全部用上，是一個具體而微的小型 CRUD（新增／查詢／更新）邏輯，很接近真實小專題的樣子。",
    task: "完成 complete_task 方法，讓它把指定 id 的任務狀態改成完成，並回傳目前「還未完成」的任務數量。",
    starter: `class TaskManager:\n    def __init__(self):\n        self.tasks = {}\n\n    def add_task(self, task_id, title):\n        self.tasks[task_id] = {"title": title, "done": False}\n\n    def complete_task(self, task_id):\n        return len(self.tasks)\n\ntm = TaskManager()\ntm.add_task(1, "寫報告")\ntm.add_task(2, "回信")\ntm.add_task(3, "開會")\ntm.complete_task(1)\nprint(tm.complete_task(2))`,
    expected: "1",
    hint: '把方法內容改成：\nself.tasks[task_id]["done"] = True\nreturn len([t for t in self.tasks.values() if not t["done"]])',
  },
];

const STAGES = [...new Set(TOPICS.map((t) => t.stage))];

function indentBody(code) {
  return code
    .split("\n")
    .map((line) => (line.trim() === "" ? "" : "    " + line))
    .join("\n");
}

function PythonNotebook() {
  const [activeId, setActiveId] = useState(TOPICS[0].id);
  const [codeById, setCodeById] = useState(
    Object.fromEntries(TOPICS.map((t) => [t.id, t.starter]))
  );
  const [outputById, setOutputById] = useState({});
  const [statusById, setStatusById] = useState({});
  const [doneIds, setDoneIds] = useState({});
  const [hintShownById, setHintShownById] = useState({});
  const [pyodideState, setPyodideState] = useState("loading");
  const [running, setRunning] = useState(false);
  const pyodideRef = useRef(null);

  const active = TOPICS.find((t) => t.id === activeId);

  useEffect(() => {
    if (!document.getElementById(FONTS_LINK_ID)) {
      const link = document.createElement("link");
      link.id = FONTS_LINK_ID;
      link.rel = "stylesheet";
      link.href =
        "https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,600;1,8..60,400&family=JetBrains+Mono:wght@400;500;700&display=swap";
      document.head.appendChild(link);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    const scriptId = "pyodide-cdn-script";
    function init() {
      if (cancelled) return;
      window
        .loadPyodide({
          indexURL: "https://cdn.jsdelivr.net/npm/pyodide@0.24.1/",
        })
        .then((pyodide) => {
          if (cancelled) return;
          pyodideRef.current = pyodide;
          setPyodideState("ready");
        })
        .catch(() => {
          if (!cancelled) setPyodideState("error");
        });
    }
    if (window.loadPyodide) {
      init();
    } else if (document.getElementById(scriptId)) {
      document.getElementById(scriptId).addEventListener("load", init);
    } else {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src =
        "https://cdn.jsdelivr.net/npm/pyodide@0.24.1/pyodide.js";
      script.onload = init;
      script.onerror = () => !cancelled && setPyodideState("error");
      document.body.appendChild(script);
    }
    return () => {
      cancelled = true;
    };
  }, []);

  const runCode = useCallback(async () => {
    const topic = active;
    const code = codeById[topic.id] ?? "";
    if (!pyodideRef.current) return;
    setRunning(true);
    const wrapped = `import sys, io\nsys.stdout = io.StringIO()\ntry:\n${indentBody(
      code
    )}\nexcept Exception as e:\n    print("錯誤：" + str(e))\n_captured_output = sys.stdout.getvalue()`;
    try {
      await pyodideRef.current.runPythonAsync(wrapped);
      const raw = pyodideRef.current.globals.get("_captured_output");
      const result = (raw ?? "").toString().replace(/\n+$/, "");
      setOutputById((prev) => ({ ...prev, [topic.id]: result }));
      const pass = result.trim() === topic.expected.trim();
      setStatusById((prev) => ({ ...prev, [topic.id]: pass ? "pass" : "fail" }));
      if (pass) setDoneIds((prev) => ({ ...prev, [topic.id]: true }));
    } catch (err) {
      setOutputById((prev) => ({ ...prev, [topic.id]: "執行失敗：" + String(err) }));
      setStatusById((prev) => ({ ...prev, [topic.id]: "fail" }));
    } finally {
      setRunning(false);
    }
  }, [active, codeById]);

  return (
    <div
      style={{
        fontFamily: "'Source Serif 4', Georgia, serif",
        background: "#EDEAE0",
        minHeight: "100%",
        color: "#2B2A28",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <style>{`
        .py-mono { font-family: 'JetBrains Mono', ui-monospace, monospace; }
        .topic-btn { transition: background 0.15s ease, border-color 0.15s ease; }
        .topic-btn:hover { background: #E4E0D3; }
        .run-btn:disabled { opacity: 0.5; cursor: default; }
        .hint-btn:hover { text-decoration: underline; }
        textarea.code-area:focus { outline: none; border-color: #3B4C9E; }
        ::selection { background: #C9D1F0; }
      `}</style>

      <header style={{ padding: "22px 28px 18px", borderBottom: "1px solid #D8D2C4" }}>
        <div className="py-mono" style={{ fontSize: 13, letterSpacing: 0.3, color: "#6B675E" }}>
          {active.stage}
        </div>
        <h1 style={{ margin: "4px 0 0", fontSize: 26, fontWeight: 600 }}>
          Python 自學筆記
        </h1>
      </header>

      <div style={{ display: "flex", flex: 1, minHeight: 0 }}>
        <nav
          style={{
            width: 220,
            flexShrink: 0,
            borderRight: "1px solid #D8D2C4",
            padding: "16px 0",
            overflowY: "auto",
          }}
        >
          {STAGES.map((stage) => (
            <div key={stage} style={{ marginBottom: 6 }}>
              <div
                className="py-mono"
                style={{
                  fontSize: 11,
                  color: "#8A8577",
                  padding: "10px 20px 4px",
                }}
              >
                {stage}
              </div>
              {TOPICS.filter((t) => t.stage === stage).map((t) => {
                const isActive = t.id === activeId;
                const isDone = doneIds[t.id];
                return (
                  <button
                    key={t.id}
                    className="topic-btn"
                    onClick={() => setActiveId(t.id)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      width: "100%",
                      textAlign: "left",
                      padding: "9px 20px",
                      background: isActive ? "#E4E0D3" : "transparent",
                      border: "none",
                      borderLeft: isActive ? "3px solid #3B4C9E" : "3px solid transparent",
                      cursor: "pointer",
                      fontFamily: "inherit",
                      fontSize: 14.5,
                      color: "#2B2A28",
                    }}
                  >
                    <span
                      className="py-mono"
                      style={{ fontSize: 11.5, color: isDone ? "#4B7052" : "#6B675E", width: 26 }}
                    >
                      {isDone ? "✓" : t.tag}
                    </span>
                    <span>{t.title}</span>
                  </button>
                );
              })}
            </div>
          ))}
        </nav>

        <main style={{ flex: 1, padding: "26px 34px 40px", overflowY: "auto" }}>
          <div
            style={{
              position: "relative",
              maxWidth: 640,
              background: "#FBF9F4",
              border: "1px solid #DCD6C8",
              borderRadius: 3,
              padding: "20px 24px",
              transform: "rotate(-0.4deg)",
              boxShadow: "0 6px 14px rgba(43,42,40,0.10)",
              marginBottom: 30,
            }}
          >
            <div
              style={{
                position: "absolute",
                top: -10,
                left: 28,
                width: 54,
                height: 18,
                background: "rgba(59,76,158,0.16)",
                transform: "rotate(-3deg)",
              }}
            />
            <div className="py-mono" style={{ fontSize: 12, color: "#3B4C9E", marginBottom: 8 }}>
              觀念筆記
            </div>
            <h2 style={{ margin: "0 0 10px", fontSize: 20, fontWeight: 600 }}>{active.title}</h2>
            <p style={{ margin: 0, lineHeight: 1.75, fontSize: 15.5, color: "#3A3833" }}>
              {active.note}
            </p>
          </div>

          <div style={{ maxWidth: 640 }}>
            <div style={{ fontSize: 15, marginBottom: 12, color: "#2B2A28" }}>
              <strong
                className="py-mono"
                style={{ fontSize: 12, color: "#6B675E", display: "block", marginBottom: 6 }}
              >
                練習題
              </strong>
              {active.task}
            </div>

            <textarea
              className="code-area py-mono"
              value={codeById[active.id] ?? ""}
              onChange={(e) =>
                setCodeById((prev) => ({ ...prev, [active.id]: e.target.value }))
              }
              spellCheck={false}
              style={{
                width: "100%",
                minHeight: 120,
                background: "#FFFFFF",
                border: "1px solid #D8D2C4",
                borderRadius: 3,
                padding: "14px 16px",
                fontSize: 14.5,
                lineHeight: 1.6,
                color: "#2B2A28",
                resize: "vertical",
                boxSizing: "border-box",
              }}
            />

            <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 14, flexWrap: "wrap" }}>
              <button
                className="run-btn py-mono"
                onClick={runCode}
                disabled={pyodideState !== "ready" || running}
                style={{
                  background: "#3B4C9E",
                  color: "#F5F3EC",
                  border: "none",
                  borderRadius: 3,
                  padding: "9px 20px",
                  fontSize: 13.5,
                  cursor: "pointer",
                }}
              >
                {pyodideState === "loading" ? "環境載入中…" : running ? "執行中…" : "▸ 執行程式碼"}
              </button>

              <button
                className="hint-btn py-mono"
                onClick={() =>
                  setHintShownById((prev) => ({ ...prev, [active.id]: !prev[active.id] }))
                }
                style={{
                  background: "none",
                  border: "none",
                  color: "#6B675E",
                  fontSize: 13,
                  cursor: "pointer",
                  padding: 0,
                }}
              >
                {hintShownById[active.id] ? "隱藏提示" : "💡 卡關了？看提示"}
              </button>

              {pyodideState === "error" && (
                <span style={{ fontSize: 13, color: "#A33B3B" }}>
                  執行環境載入失敗，請檢查網路連線後重新整理。
                </span>
              )}
              {statusById[active.id] === "pass" && (
                <span className="py-mono" style={{ fontSize: 13, color: "#4B7052" }}>
                  ✓ 正確！輸出符合預期
                </span>
              )}
              {statusById[active.id] === "fail" && (
                <span className="py-mono" style={{ fontSize: 13, color: "#A33B3B" }}>
                  尚未通過，再檢查一下輸出內容
                </span>
              )}
            </div>

            {hintShownById[active.id] && (
              <div
                style={{
                  marginTop: 12,
                  background: "#F1EEE3",
                  border: "1px dashed #C7C0AE",
                  borderRadius: 3,
                  padding: "10px 14px",
                  fontSize: 13.5,
                  color: "#4A473F",
                  whiteSpace: "pre-wrap",
                }}
              >
                {active.hint}
              </div>
            )}

            {active.id in outputById && (
              <div style={{ marginTop: 16 }}>
                <div className="py-mono" style={{ fontSize: 12, color: "#6B675E", marginBottom: 6 }}>
                  輸出結果
                </div>
                <pre
                  className="py-mono"
                  style={{
                    margin: 0,
                    background: "#2B2A28",
                    color: "#EDEAE0",
                    borderRadius: 3,
                    padding: "12px 16px",
                    fontSize: 13.5,
                    whiteSpace: "pre-wrap",
                    minHeight: 20,
                  }}
                >
                  {outputById[active.id] || " "}
                </pre>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
