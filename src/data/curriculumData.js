export const CURRICULUM_DATA = {
  python: {
    id: 'python',
    name: 'Python',
    icon: '🐍',
    badge: 'Popular',
    color: '#38bdf8',
    description: 'Master Python from fundamentals to OOP, APIs, testing, data handling, and practical projects.',
    levels: {
      beginner: [
        {
          id: 'py_01',
          title: 'Introduction to Python',
          level: 'Beginner',
          duration: '20 mins',
          description: 'Overview of Python, the Python interpreter, execution model, Zen of Python, and running your first script.',
          keyConcepts: ['Interpreted vs Compiled', 'REPL / Terminal execution', 'PEP 8 Style Guide', 'Indentation & Whitespace'],
          codeExample: `# Your First Python Program
def greet(name: str) -> str:
    """Returns a personalized greeting."""
    return f"Welcome to TechVerse, {name}!"

if __name__ == "__main__":
    print(greet("Alex"))`,
          quickExercise: 'What command displays the Zen of Python in the interactive terminal? (Answer: import this)'
        },
        {
          id: 'py_02',
          title: 'Variables and Data Types',
          level: 'Beginner',
          duration: '30 mins',
          description: 'Dynamically typed variables, integers, floats, booleans, strings, NoneType, and type casting with type() and isinstance().',
          keyConcepts: ['Dynamic Typing', 'Immutable Primitives', 'Explicit Type Casting', 'Type Annotations'],
          codeExample: `# Variable declarations with Python 3.10+ type hints
student_name: str = "Alex Rivera"
age: int = 21
gpa: float = 3.88
is_enrolled: bool = True

print(f"Student: {student_name}, Type: {type(student_name).__name__}")
print(f"GPA rounded: {round(gpa, 1)}, Is int? {isinstance(age, int)}")`,
          quickExercise: 'What is the output of bool(0) and bool("False")? (Answer: False and True)'
        },
        {
          id: 'py_03',
          title: 'Operators and Expressions',
          level: 'Beginner',
          duration: '25 mins',
          description: 'Arithmetic operators, floor division, modulo, exponentiation, comparison operators, assignment shortcuts, and identity vs equality.',
          keyConcepts: ['Arithmetic & Floor Division (//)', 'Modulo & Exponent (**)', 'Identity (is) vs Equality (==)', 'Operator Precedence'],
          codeExample: `a, b = 15, 4

print("Floor Division:", a // b)  # 3
print("Modulo:", a % b)          # 3
print("Exponent:", a ** 2)       # 225

list1 = [1, 2, 3]
list2 = [1, 2, 3]
print("Equality (==):", list1 == list2)  # True (same values)
print("Identity (is):", list1 is list2)  # False (distinct memory objects)`,
          quickExercise: 'Explain the difference between "==" and "is" in Python.'
        },
        {
          id: 'py_04',
          title: 'User Input and Output',
          level: 'Beginner',
          duration: '25 mins',
          description: 'Standard input handling with input(), formatted printing with f-strings, str.format(), and output stream flush.',
          keyConcepts: ['input() returns strings', 'Type casting inputs', 'Formatted string literals (f-strings)', 'print(*args, sep, end)'],
          codeExample: `# Input parsing and precision formatting
user_radius_str = "5.5"  # Simulated input("Enter radius: ")
radius = float(user_radius_str)
area = 3.14159 * (radius ** 2)

print(f"Radius: {radius:>6.2f} units")
print(f"Area:   {area:>6.2f} sq units")`,
          quickExercise: 'How do you print without a trailing newline in Python? (Answer: print(..., end=""))'
        },
        {
          id: 'py_05',
          title: 'Conditions and Boolean Logic',
          level: 'Beginner',
          duration: '30 mins',
          description: 'Branching logic using if, elif, else, logical operators (and, or, not), truthy/falsy evaluation, and ternary conditional expressions.',
          keyConcepts: ['Boolean Logic & Short-Circuiting', 'Truthy & Falsy Values', 'Ternary Expressions', 'Chained Comparisons'],
          codeExample: `score = 88

# Chained comparison
if 90 <= score <= 100:
    grade = "A"
elif 80 <= score < 90:
    grade = "B"
else:
    grade = "C"

# Ternary expression
status = "Honors" if score >= 85 else "Pass"
print(f"Score {score}: Grade {grade} ({status})")`,
          quickExercise: 'Which values evaluate to falsy in Python? (Answer: 0, 0.0, "", [], {}, set(), None, False)'
        },
        {
          id: 'py_06',
          title: 'Loops: for and while',
          level: 'Beginner',
          duration: '35 mins',
          description: 'Definite iteration using for loops with range() and enumerate(), indefinite iteration with while loops, break, continue, and the else clause on loops.',
          keyConcepts: ['range(start, stop, step)', 'enumerate() & zip()', 'break and continue', 'for-else and while-else'],
          codeExample: `target = 7
found = False

for idx, val in enumerate([2, 4, 7, 9, 12]):
    if val == target:
        print(f"Found target {target} at index {idx}!")
        found = True
        break
else:
    print("Loop finished without breaking (Target not found).")`,
          quickExercise: 'When does the "else" block execute in a Python for loop? (Answer: When no break statement is encountered)'
        }
      ],
      intermediate: [
        {
          id: 'py_07',
          title: 'Strings and Text Processing',
          level: 'Intermediate',
          duration: '30 mins',
          description: 'String immutability, slicing syntax [start:stop:step], built-in methods (split, join, strip, replace), and unicode encoding.',
          keyConcepts: ['Slicing Syntax', 'String Methods', 'join() for efficiency', 'Escape Characters'],
          codeExample: `raw_text = "  python,javascript,rust,go  "
languages = [lang.strip().capitalize() for lang in raw_text.split(",")]
formatted = " -> ".join(languages)
reversed_str = formatted[::-1]

print("Processed:", formatted)
print("Reversed:", reversed_str)`,
          quickExercise: 'How do you reverse a string in Python in one line? (Answer: s[::-1])'
        },
        {
          id: 'py_08',
          title: 'Lists, Tuples, Sets, and Dictionaries',
          level: 'Intermediate',
          duration: '45 mins',
          description: 'Comprehensive mastery of Python built-in data structures: mutable lists, immutable tuples, hash-based sets, and key-value dictionaries with comprehensions.',
          keyConcepts: ['List/Dict/Set Comprehensions', 'Hash Table lookups O(1)', 'Tuples as Dictionary Keys', 'Set operations (union, intersection)'],
          codeExample: `# Advanced Comprehensions and Set Operations
numbers = [1, 2, 2, 3, 4, 5, 5, 6]
unique_evens = {x ** 2 for x in numbers if x % 2 == 0}

student_scores = {"Alex": 92, "Aisha": 96, "Rahul": 85}
top_students = {k: v for k, v in student_scores.items() if v >= 90}

print("Unique Evens Squared (Set):", unique_evens)
print("Top Students (Dict):", top_students)`,
          quickExercise: 'Why are lists unhashable and cannot be used as dictionary keys? (Answer: Because lists are mutable)'
        },
        {
          id: 'py_09',
          title: 'Functions and Modular Code',
          level: 'Intermediate',
          duration: '40 mins',
          description: 'Defining functions, positional arguments, keyword arguments, default parameters, variable-length arguments (*args, **kwargs), and return tuples.',
          keyConcepts: ['*args (Tuple) and **kwargs (Dict)', 'Default Parameter Gotchas (Mutable defaults)', 'Docstrings & Typing', 'Pure Functions'],
          codeExample: `def build_developer_profile(name, *skills, **metadata):
    """Builds a structured developer profile."""
    return {
        "name": name,
        "skills": list(skills),
        "attributes": metadata
    }

profile = build_developer_profile(
    "Alex", "Python", "FastAPI", "React",
    role="Full-Stack Engineer", xp=1450
)
print("Profile:", profile)`,
          quickExercise: 'Why should you never use a mutable default argument like def f(x=[])? (Answer: It is evaluated once and shared across calls)'
        },
        {
          id: 'py_10',
          title: 'Scope, Closures, and Lambda Functions',
          level: 'Intermediate',
          duration: '35 mins',
          description: 'LEGB variable scope lookup (Local, Enclosing, Global, Built-in), global and nonlocal keywords, lexical closures, and anonymous lambda expressions.',
          keyConcepts: ['LEGB Rule', 'Closures & Factory Functions', 'nonlocal Keyword', 'Anonymous Lambdas with map/filter/sorted'],
          codeExample: `# Lexical Closure: Multiplier Factory
def make_multiplier(factor):
    def multiply(number):
        return number * factor
    return multiply

double = make_multiplier(2)
triple = make_multiplier(3)

print("Double 15:", double(15))  # 30
print("Triple 15:", triple(15))  # 45

# Lambda sorting by score
data = [("Alex", 92), ("Aisha", 98), ("Rahul", 88)]
sorted_data = sorted(data, key=lambda item: item[1], reverse=True)
print("Ranked:", sorted_data)`,
          quickExercise: 'What is the order of Python scope resolution? (Answer: LEGB: Local, Enclosing, Global, Built-in)'
        },
        {
          id: 'py_11',
          title: 'Object-Oriented Programming (OOP)',
          level: 'Intermediate',
          duration: '45 mins',
          description: 'OOP core pillars: Encapsulation, Abstraction, Inheritance, and Polymorphism in Python. self parameter, dunder methods (__init__, __str__, __repr__).',
          keyConcepts: ['Classes and Instances', '__init__ Constructor', 'Encapsulation with Private Attributes (_ and __)', '__str__ vs __repr__'],
          codeExample: `class BankAccount:
    def __init__(self, owner: str, initial_balance: float = 0.0):
        self.owner = owner
        self._balance = initial_balance  # Protected

    def deposit(self, amount: float) -> float:
        if amount <= 0:
            raise ValueError("Deposit must be positive")
        self._balance += amount
        return self._balance

    @property
    def balance(self) -> float:
        return self._balance

    def __str__(self):
        return f"BankAccount(owner='{self.owner}', balance={self._balance:.2f})"

acc = BankAccount("Alex", 500.0)
acc.deposit(150.0)
print(acc)`,
          quickExercise: 'What does the @property decorator do in Python? (Answer: Defines a getter method accessed like an attribute)'
        },
        {
          id: 'py_12',
          title: 'Classes, Inheritance, and Polymorphism',
          level: 'Intermediate',
          duration: '45 mins',
          description: 'Subclassing, method overriding, super() delegation, multiple inheritance, Method Resolution Order (MRO), and abstract base classes (abc module).',
          keyConcepts: ['super() Delegation', 'Method Resolution Order (C3 Linearization)', 'Polymorphism via Duck Typing', 'Abstract Base Classes (ABC)'],
          codeExample: `from abc import ABC, abstractmethod

class Shape(ABC):
    @abstractmethod
    def area(self) -> float:
        pass

class Rectangle(Shape):
    def __init__(self, width: float, height: float):
        self.width = width
        self.height = height

    def area(self) -> float:
        return self.width * self.height

class Circle(Shape):
    def __init__(self, radius: float):
        self.radius = radius

    def area(self) -> float:
        return 3.14159 * (self.radius ** 2)

shapes = [Rectangle(4, 5), Circle(3)]
for s in shapes:
    print(f"{type(s).__name__} Area: {s.area():.2f}")`,
          quickExercise: 'How do you inspect the inheritance chain of a class? (Answer: ClassName.__mro__ or ClassName.mro())'
        }
      ],
      advanced: [
        {
          id: 'py_13',
          title: 'Exception Handling and Robust Code',
          level: 'Advanced',
          duration: '35 mins',
          description: 'Defensive programming using try, except, else, finally blocks. Raising exceptions, custom exception classes, and exception chaining with from.',
          keyConcepts: ['Exception Hierarchy', 'try-except-else-finally', 'Custom Exceptions', 'raise ... from e Chaining'],
          codeExample: `class InsufficientFundsError(Exception):
    """Raised when a withdrawal exceeds balance."""
    pass

def withdraw(balance, amount):
    if amount > balance:
        raise InsufficientFundsError(f"Cannot withdraw {amount} from balance {balance}")
    return balance - amount

try:
    current_balance = withdraw(100, 150)
except InsufficientFundsError as err:
    print("Handled Error:", err)
else:
    print("Withdrawal successful, new balance:", current_balance)
finally:
    print("Transaction audit logged.")`,
          quickExercise: 'When does the "else" block execute in a try-except structure? (Answer: When no exception occurred in the try block)'
        },
        {
          id: 'py_14',
          title: 'File Handling and Context Managers',
          level: 'Advanced',
          duration: '40 mins',
          description: 'Reading and writing text, CSV, and binary files with the with statement (context managers). Implementing custom context managers with __enter__ and __exit__.',
          keyConcepts: ['with statement (Deterministic cleanup)', 'read(), readline(), readlines()', 'pathlib.Path modern API', 'Custom Context Managers (__enter__/__exit__)'],
          codeExample: `import tempfile
import os

# Using modern context management
with tempfile.NamedTemporaryFile("w+", delete=False) as f:
    f.write("TechVerse\\nAI Learning\\nDeep Work\\n")
    temp_path = f.name

with open(temp_path, "r") as f:
    lines = [line.strip() for line in f]

os.remove(temp_path)
print("File content read successfully:", lines)`,
          quickExercise: 'What methods must a class implement to support the "with" statement? (Answer: __enter__ and __exit__)'
        },
        {
          id: 'py_15',
          title: 'Modules, Packages, and Virtual Environments',
          level: 'Advanced',
          duration: '35 mins',
          description: 'Organizing code into modules and packages, __init__.py, __all__, relative vs absolute imports, and modern environment management with venv.',
          keyConcepts: ['__name__ == "__main__"', '__init__.py package marker', 'sys.path and Module Discovery', 'python -m venv'],
          codeExample: `# Simulating module exports and inspectability
import math
import sys

def calculate_hypotenuse(a, b):
    return math.hypot(a, b)

print("Hypotenuse (3, 4):", calculate_hypotenuse(3, 4))
print("Python Version:", sys.version.split()[0])`,
          quickExercise: 'What is the purpose of if __name__ == "__main__"? (Answer: Allows script execution while preventing auto-execution when imported)'
        },
        {
          id: 'py_16',
          title: 'APIs, HTTP Requests, and JSON Serialization',
          level: 'Advanced',
          duration: '45 mins',
          description: 'Working with JSON serialization (json.dumps, json.loads), consuming RESTful APIs, HTTP headers, status codes, and error handling.',
          keyConcepts: ['json.dumps() and json.loads()', 'Custom JSON Encoders', 'HTTP Methods (GET, POST)', 'Urllib / Requests patterns'],
          codeExample: `import json

payload = {
    "student_id": 101,
    "name": "Alex",
    "enrolled_tracks": ["Python", "System Design"],
    "active": True
}

# Serialize to JSON formatted string
json_str = json.dumps(payload, indent=2)
print("Serialized JSON:\\n" + json_str)

# Deserialize back to Python dict
parsed = json.loads(json_str)
print("Parsed student name:", parsed["name"])`,
          quickExercise: 'What is the difference between json.dump() and json.dumps()? (Answer: dump writes to a file stream; dumps writes to a string)'
        },
        {
          id: 'py_17',
          title: 'Testing, Debugging, and Profiling',
          level: 'Advanced',
          duration: '40 mins',
          description: 'Writing unit tests with pytest and unittest, assertions, mock objects, using pdb / breakpoint() for debugging, and cProfile for performance bottlenecks.',
          keyConcepts: ['unittest.TestCase', 'pytest assertions & fixtures', 'breakpoint() built-in debugger', 'cProfile and timeit'],
          codeExample: `import unittest

def binary_search(arr, target):
    l, r = 0, len(arr) - 1
    while l <= r:
        m = (l + r) // 2
        if arr[m] == target:
            return m
        elif arr[m] < target:
            l = m + 1
        else:
            r = m - 1
    return -1

class TestBinarySearch(unittest.TestCase):
    def test_found(self):
        self.assertEqual(binary_search([1, 3, 5, 7, 9], 7), 3)

    def test_not_found(self):
        self.assertEqual(binary_search([1, 3, 5, 7, 9], 4), -1)

suite = unittest.TestLoader().loadTestsFromTestCase(TestBinarySearch)
runner = unittest.TextTestRunner(verbosity=0)
result = runner.run(suite)
print(f"Tests run: {result.testsRun}, Errors: {len(result.errors)}, Failures: {len(result.failures)}")`,
          quickExercise: 'What keyword invokes the interactive Python debugger in Python 3.7+? (Answer: breakpoint())'
        }
      ],
      projects: [
        {
          id: 'py_18',
          title: 'Practical Project: CLI Task & Study Tracker',
          level: 'Project',
          duration: '2 hours',
          description: 'Build a production-quality CLI study & task tracker using Python, supporting persistent JSON storage, priority flags, deadline validation, and progress statistics.',
          keyConcepts: ['argparse / CLI flags', 'File I/O with JSON persistence', 'OOP data modeling', 'Error handling & validation'],
          codeExample: `import json
from datetime import datetime

class TaskTracker:
    def __init__(self, filename="tasks.json"):
        self.filename = filename
        self.tasks = []

    def add_task(self, title, category="General"):
        task = {
            "id": len(self.tasks) + 1,
            "title": title,
            "category": category,
            "completed": False,
            "created_at": datetime.now().isoformat()
        }
        self.tasks.append(task)
        return task

    def summary(self):
        total = len(self.tasks)
        done = sum(1 for t in self.tasks if t["completed"])
        return f"Total: {total}, Completed: {done} ({(done/total*100) if total else 0:.0f}%)"

tracker = TaskTracker()
tracker.add_task("Master Python OOP", "Python")
tracker.add_task("Complete Binary Search in Code Lab", "DSA")
print("Tracker Status:", tracker.summary())`,
          quickExercise: 'Extend the TaskTracker class to save and load tasks from disk.'
        }
      ]
    }
  },

  java: {
    id: 'java',
    name: 'Java',
    icon: '☕',
    badge: 'Enterprise',
    color: '#f97316',
    description: 'Master core Java, object-oriented design, Collections, Streams, multithreading, and Spring architecture.',
    levels: {
      beginner: [
        {
          id: 'java_01',
          title: 'JVM Architecture, JDK, and First Program',
          level: 'Beginner',
          duration: '25 mins',
          description: 'Understanding bytecode, JVM, JRE, JDK, class loaders, JIT compilation, and writing standard Java applications.',
          keyConcepts: ['Write Once, Run Anywhere', 'JDK vs JRE vs JVM', 'public static void main(String[] args)', 'Classpath'],
          codeExample: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, TechVerse Developer!");
    }
}`,
          quickExercise: 'What file extension is generated after compiling a Java file? (Answer: .class bytecode)'
        },
        {
          id: 'java_02',
          title: 'Data Types, Operators, and Control Flow',
          level: 'Beginner',
          duration: '30 mins',
          description: 'Primitive types (int, double, char, boolean), wrapper classes, type casting, if-else, switch expressions, and loops.',
          keyConcepts: ['Primitive vs Reference Types', 'Autoboxing & Unboxing', 'Enhanced switch with arrows', 'for-each loops'],
          codeExample: `public class ControlFlow {
    public static void main(String[] args) {
        int day = 3;
        String dayName = switch (day) {
            case 1 -> "Monday";
            case 2 -> "Tuesday";
            case 3 -> "Wednesday";
            default -> "Other";
        };
        System.out.println("Day: " + dayName);
    }
}`,
          quickExercise: 'How many bytes does a double take in Java? (Answer: 8 bytes / 64 bits)'
        }
      ],
      intermediate: [
        {
          id: 'java_03',
          title: 'Object-Oriented Programming in Java',
          level: 'Intermediate',
          duration: '45 mins',
          description: 'Classes, constructors, encapsulation, access modifiers (public, protected, private, package-private), and static members.',
          keyConcepts: ['Encapsulation & Access Modifiers', 'Constructor Overloading', 'static fields and methods', 'this keyword'],
          codeExample: `public class Student {
    private String name;
    private int xp;

    public Student(String name, int xp) {
        this.name = name;
        this.xp = xp;
    }

    public int getXp() { return xp; }
    public void addXp(int amount) { this.xp += amount; }
}`,
          quickExercise: 'What is the default access modifier in Java when none is specified? (Answer: Package-private)'
        },
        {
          id: 'java_04',
          title: 'Inheritance, Interfaces, and Polymorphism',
          level: 'Intermediate',
          duration: '45 mins',
          description: 'Inheritance via extends, interface contracts via implements, abstract classes, method overriding with @Override, and dynamic method dispatch.',
          keyConcepts: ['@Override Annotation', 'Multiple Interface Implementation', 'Default methods in interfaces', 'Polymorphic references'],
          codeExample: `interface Executable {
    void execute();
}

abstract class Task implements Executable {
    protected String title;
    public Task(String title) { this.title = title; }
}

class CodeTask extends Task {
    public CodeTask(String title) { super(title); }
    @Override
    public void execute() {
        System.out.println("Running code task: " + title);
    }
}`,
          quickExercise: 'Can a class extend multiple classes in Java? (Answer: No, Java supports single class inheritance)'
        },
        {
          id: 'java_05',
          title: 'Collections Framework and Generics',
          level: 'Intermediate',
          duration: '50 mins',
          description: 'List (ArrayList, LinkedList), Set (HashSet, TreeSet), Map (HashMap, TreeMap), Queue, and type-safe Generics.',
          keyConcepts: ['ArrayList vs LinkedList', 'HashMap internals (hash buckets & equals/hashCode)', 'Comparable and Comparator', 'Type Erasure'],
          codeExample: `import java.util.*;

public class CollectionsDemo {
    public static void main(String[] args) {
        Map<String, Integer> scoreMap = new HashMap<>();
        scoreMap.put("Alex", 95);
        scoreMap.put("Aisha", 98);

        for (Map.Entry<String, Integer> entry : scoreMap.entrySet()) {
            System.out.println(entry.getKey() + ": " + entry.getValue());
        }
    }
}`,
          quickExercise: 'What is the average time complexity for HashMap.get(key)? (Answer: O(1))'
        }
      ],
      advanced: [
        {
          id: 'java_06',
          title: 'Java Streams API and Lambdas',
          level: 'Advanced',
          duration: '45 mins',
          description: 'Functional interfaces, lambda syntax, Stream pipeline (filter, map, reduce, collect), parallel streams, and Optional<T>.',
          keyConcepts: ['Declarative vs Imperative', 'Intermediate vs Terminal operations', 'Optional to prevent NullPointerException', 'Collectors.groupingBy'],
          codeExample: `import java.util.List;

public class StreamsDemo {
    public static void main(String[] args) {
        List<String> skills = List.of("Java", "Python", "SQL", "JavaScript", "Docker");
        List<String> filtered = skills.stream()
            .filter(s -> s.length() > 4)
            .map(String::toUpperCase)
            .toList();
        System.out.println("Filtered: " + filtered);
    }
}`,
          quickExercise: 'Is stream().filter(...) an intermediate or terminal operation? (Answer: Intermediate)'
        },
        {
          id: 'java_07',
          title: 'Multithreading and Concurrency',
          level: 'Advanced',
          duration: '50 mins',
          description: 'Thread creation, Runnable, synchronization, locks, ExecutorService, thread pools, and race conditions.',
          keyConcepts: ['Thread vs Runnable', 'synchronized block and volatile', 'ExecutorService & ThreadPools', 'CompletableFuture'],
          codeExample: `import java.util.concurrent.*;

public class ThreadDemo {
    public static void main(String[] args) throws Exception {
        ExecutorService executor = Executors.newFixedThreadPool(2);
        Future<Integer> future = executor.submit(() -> 40 + 2);
        System.out.println("Computed in thread: " + future.get());
        executor.shutdown();
    }
}`,
          quickExercise: 'What does the volatile keyword ensure in Java? (Answer: Visibility of variable updates across threads)'
        }
      ],
      projects: [
        {
          id: 'java_08',
          title: 'Practical Project: RESTful Service with Spring Boot',
          level: 'Project',
          duration: '2.5 hours',
          description: 'Build a production-style REST API with Spring Boot, JPA entities, repositories, controller endpoints, and input validation.',
          keyConcepts: ['Spring Boot Starter Web', '@RestController and @RequestMapping', 'JPA Repositories', 'DTO pattern'],
          codeExample: `// Spring Controller Snippet
// @RestController
// @RequestMapping("/api/tasks")
// public class TaskController {
//     @GetMapping
//     public List<Task> getTasks() { return taskService.findAll(); }
// }`,
          quickExercise: 'What annotation marks a Spring component as a REST controller? (Answer: @RestController)'
        }
      ]
    }
  },

  c: {
    id: 'c',
    name: 'C Programming',
    icon: '⚡',
    badge: 'Foundational',
    color: '#06b6d4',
    description: 'Learn memory management, pointers, structs, system programming, and low-level software architecture.',
    levels: {
      beginner: [
        {
          id: 'c_01',
          title: 'C Fundamentals, Compilation, and Syntax',
          level: 'Beginner',
          duration: '30 mins',
          description: 'The C execution model: preprocessor, compiler, assembler, linker. Header files (#include), main(), and standard I/O (printf, scanf).',
          keyConcepts: ['Compilation stages (gcc -E, -S, -c, -o)', 'Format specifiers (%d, %f, %s, %p)', 'Header guards', 'Return codes'],
          codeExample: `#include <stdio.h>

int main(void) {
    printf("TechVerse: C Programming Architecture\\n");
    return 0;
}`,
          quickExercise: 'What does gcc -Wall do during compilation? (Answer: Enables all compiler warnings)'
        },
        {
          id: 'c_02',
          title: 'Data Types, Operators, and Control Structures',
          level: 'Beginner',
          duration: '35 mins',
          description: 'Primitive types (char, int, float, double), signed vs unsigned, sizeof operator, while/for loops, and switch statements.',
          keyConcepts: ['Fixed memory representations', 'sizeof operator', 'Integer overflow semantics', 'Control flow'],
          codeExample: `#include <stdio.h>

int main(void) {
    printf("Size of int: %zu bytes\\n", sizeof(int));
    printf("Size of char: %zu bytes\\n", sizeof(char));
    printf("Size of double: %zu bytes\\n", sizeof(double));
    return 0;
}`,
          quickExercise: 'What is the size of char guaranteed to be by the C standard? (Answer: 1 byte)'
        }
      ],
      intermediate: [
        {
          id: 'c_03',
          title: 'Pointers and Memory Addresses',
          level: 'Intermediate',
          duration: '50 mins',
          description: 'Deep dive into computer memory: memory addresses, address-of operator (&), dereference operator (*), pointer types, and void pointers.',
          keyConcepts: ['Memory layout (Stack, Heap, Data, Code)', 'Pointer dereferencing (*p)', 'Pass-by-reference semantics in C', 'NULL pointers & segmentation faults'],
          codeExample: `#include <stdio.h>

void swap(int *a, int *b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

int main(void) {
    int x = 10, y = 20;
    swap(&x, &y);
    printf("Swapped: x = %d, y = %d\\n", x, y);
    return 0;
}`,
          quickExercise: 'What happens when you dereference a NULL pointer? (Answer: Segmentation fault / Undefined behavior)'
        },
        {
          id: 'c_04',
          title: 'Arrays, Strings, and Pointer Arithmetic',
          level: 'Intermediate',
          duration: '45 mins',
          description: 'Arrays as contiguous blocks in memory, pointer decay, pointer arithmetic (ptr + 1), string manipulation, and null terminator character (\0).',
          keyConcepts: ['Array pointer decay', 'Pointer Arithmetic (step size based on type)', 'Null-terminated char arrays', 'Buffer overruns & safety'],
          codeExample: `#include <stdio.h>

int main(void) {
    char str[] = "Focus";
    char *ptr = str;

    while (*ptr != '\\0') {
        printf("%c -> address: %p\\n", *ptr, (void*)ptr);
        ptr++;
    }
    return 0;
}`,
          quickExercise: 'Why must every string in C end with the \\0 character? (Answer: To indicate the end of the string to library functions)'
        },
        {
          id: 'c_05',
          title: 'Dynamic Memory Allocation (malloc, calloc, free)',
          level: 'Intermediate',
          duration: '50 mins',
          description: 'Heap allocation with malloc, calloc, realloc, detecting allocation failures, and preventing memory leaks using free.',
          keyConcepts: ['Heap vs Stack allocation', 'malloc vs calloc (zero initialization)', 'Dangling pointers', 'Memory leak detection with Valgrind'],
          codeExample: `#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int n = 5;
    int *arr = (int*)malloc(n * sizeof(int));
    if (arr == NULL) return 1;

    for (int i = 0; i < n; i++) arr[i] = (i + 1) * 10;
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\\n");

    free(arr);
    arr = NULL; // Prevent dangling pointer
    return 0;
}`,
          quickExercise: 'What is the danger of not freeing dynamically allocated memory? (Answer: Memory leak causing excessive memory usage)'
        }
      ],
      advanced: [
        {
          id: 'c_06',
          title: 'Structures, Unions, and Bit Manipulation',
          level: 'Advanced',
          duration: '45 mins',
          description: 'Defining composite types with struct, typedef, member access (. and ->), unions, memory alignment/padding, and bitwise operators (&, |, ^, ~, <<, >>).',
          keyConcepts: ['struct vs union memory sharing', 'Memory alignment & structure padding', 'Arrow operator (ptr->member)', 'Bit masks and flag setting'],
          codeExample: `#include <stdio.h>

typedef struct {
    int id;
    char name[32];
    float gpa;
} Student;

int main(void) {
    Student s = {101, "Alex", 3.88f};
    Student *ptr = &s;
    printf("Student: %s, GPA: %.2f\\n", ptr->name, ptr->gpa);
    return 0;
}`,
          quickExercise: 'What is the difference between struct and union? (Answer: struct members each have separate memory; union members share the same memory space)'
        },
        {
          id: 'c_07',
          title: 'File I/O and System Calls',
          level: 'Advanced',
          duration: '45 mins',
          description: 'File streams using FILE*, fopen, fclose, fread, fwrite, fgets, fputs, error handling with errno and perror.',
          keyConcepts: ['Stream buffering', 'Text vs Binary mode', 'File pointers and EOF', 'Error codes (errno)'],
          codeExample: `#include <stdio.h>

int main(void) {
    FILE *fp = fopen("log.txt", "w");
    if (fp == NULL) return 1;
    fputs("TechVerse C Engine Active\\n", fp);
    fclose(fp);
    return 0;
}`,
          quickExercise: 'What value does fopen return on failure? (Answer: NULL)'
        }
      ],
      projects: [
        {
          id: 'c_08',
          title: 'Practical Project: In-Memory Key-Value Storage Engine',
          level: 'Project',
          duration: '2 hours',
          description: 'Build a lightweight in-memory key-value database engine in C utilizing dynamic memory allocation, custom hash tables, and collision chaining.',
          keyConcepts: ['Custom Hash Function (djb2)', 'Dynamic Linked List Buckets', 'malloc/free integrity', 'Command parser loop'],
          codeExample: `// C Hash Table Signature
// typedef struct Node { char key[64]; char val[128]; struct Node *next; } Node;
// Node* table[256];
// void set(const char* k, const char* v);
// char* get(const char* k);`,
          quickExercise: 'What collision resolution technique uses linked lists inside hash buckets? (Answer: Chaining / Separate Chaining)'
        }
      ]
    }
  },

  cpp: {
    id: 'cpp',
    name: 'C++',
    icon: '🚀',
    badge: 'Performance',
    color: '#a855f7',
    description: 'Master modern C++ (C++17/20), STL containers, smart pointers, RAII, move semantics, and templates.',
    levels: {
      beginner: [
        {
          id: 'cpp_01',
          title: 'C++ Modern Syntax, Namespaces, and Streams',
          level: 'Beginner',
          duration: '30 mins',
          description: 'Transition from C to C++, std namespace, std::cout, std::cin, references (&) vs pointers, auto keyword, and function overloading.',
          keyConcepts: ['Namespaces (std::)', 'References (alias with no NULL)', 'Function Overloading', 'auto type deduction'],
          codeExample: `#include <iostream>
#include <string>

int main() {
    std::string name = "TechVerse Developer";
    std::cout << "Welcome, " << name << "!\\n";
    return 0;
}`,
          quickExercise: 'What is the key difference between a reference and a pointer in C++? (Answer: References cannot be null and cannot be reseated)'
        }
      ],
      intermediate: [
        {
          id: 'cpp_02',
          title: 'OOP, RAII, and Rule of Three/Five',
          level: 'Intermediate',
          duration: '50 mins',
          description: 'Classes, constructors, destructors, RAII (Resource Acquisition Is Initialization), copy constructor, copy assignment, and memory management.',
          keyConcepts: ['RAII Principle', 'Destructors (~Class)', 'Rule of Three & Rule of Five', 'Deep Copy vs Shallow Copy'],
          codeExample: `#include <iostream>

class DynamicArray {
private:
    int* data;
    size_t size;
public:
    DynamicArray(size_t s) : size(s), data(new int[s]) {}
    ~DynamicArray() { delete[] data; } // RAII automatic cleanup
};`,
          quickExercise: 'What does RAII stand for? (Answer: Resource Acquisition Is Initialization)'
        },
        {
          id: 'cpp_03',
          title: 'Standard Template Library (STL Containers & Iterators)',
          level: 'Intermediate',
          duration: '55 mins',
          description: 'std::vector, std::map, std::unordered_map, std::set, iterators, and STL algorithms (std::sort, std::find).',
          keyConcepts: ['std::vector dynamic array', 'std::unordered_map O(1) hash map', 'Iterators (begin(), end())', '<algorithm> functions'],
          codeExample: `#include <iostream>
#include <vector>
#include <algorithm>

int main() {
    std::vector<int> nums = {45, 12, 85, 32, 89};
    std::sort(nums.begin(), nums.end());
    for (int n : nums) std::cout << n << " ";
    std::cout << "\\n";
    return 0;
}`,
          quickExercise: 'What is the time complexity of std::sort in C++ STL? (Answer: O(n log n) Introsort)'
        }
      ],
      advanced: [
        {
          id: 'cpp_04',
          title: 'Smart Pointers and Move Semantics (C++11/14/17)',
          level: 'Advanced',
          duration: '50 mins',
          description: 'Modern memory safety: std::unique_ptr (exclusive ownership), std::shared_ptr (reference counting), std::weak_ptr, rvalue references (&&), and std::move.',
          keyConcepts: ['std::unique_ptr & std::make_unique', 'std::shared_ptr & Reference Counting', 'rvalue references (&&)', 'std::move zero-cost transfer'],
          codeExample: `#include <iostream>
#include <memory>

class Widget {
public:
    void display() { std::cout << "Widget active!\\n"; }
};

int main() {
    auto w = std::make_unique<Widget>();
    w->display(); // Memory automatically freed at scope exit
    return 0;
}`,
          quickExercise: 'Can a std::unique_ptr be copied? (Answer: No, it can only be moved)'
        },
        {
          id: 'cpp_05',
          title: 'Templates and Generic Programming',
          level: 'Advanced',
          duration: '45 mins',
          description: 'Function templates, class templates, template specialization, non-type template parameters, and compile-time code generation.',
          keyConcepts: ['template <typename T>', 'Template Specialization', 'Compile-Time Polymorphism', 'Concepts (C++20)'],
          codeExample: `#include <iostream>

template <typename T>
T findMax(T a, T b) {
    return (a > b) ? a : b;
}

int main() {
    std::cout << findMax(10, 25) << "\\n";
    std::cout << findMax(3.14, 2.71) << "\\n";
    return 0;
}`,
          quickExercise: 'When are C++ templates instantiated? (Answer: At compile time)'
        }
      ],
      projects: [
        {
          id: 'cpp_06',
          title: 'Practical Project: High-Performance LRU Cache',
          level: 'Project',
          duration: '2 hours',
          description: 'Implement a thread-safe, high-performance Least Recently Used (LRU) Cache in C++ using std::list and std::unordered_map.',
          keyConcepts: ['O(1) Get and Put', 'std::list splicing', 'Hash table lookup pointers', 'Concurrency locks'],
          codeExample: `// C++ LRU Cache Template
// class LRUCache {
//     int capacity;
//     std::list<std::pair<int, int>> items;
//     std::unordered_map<int, std::list<std::pair<int, int>>::iterator> cache;
// };`,
          quickExercise: 'Why is std::list used alongside std::unordered_map in an LRU cache? (Answer: For O(1) node relocation)'
        }
      ]
    }
  },

  javascript: {
    id: 'javascript',
    name: 'JavaScript',
    icon: '⚡',
    badge: 'Ubiquitous',
    color: '#eab308',
    description: 'Master JavaScript (ES6+), async/await, closures, prototypes, event loop, and web application architecture.',
    levels: {
      beginner: [
        {
          id: 'js_01',
          title: 'JS Basics, Types, and Variables (let, const)',
          level: 'Beginner',
          duration: '25 mins',
          description: 'Primitive types, type coercion, let vs const vs var, hoisting, template literals, and basic operator logic.',
          keyConcepts: ['let and const block scoping', 'Type coercion (== vs ===)', 'Template Literals', 'Hoisting semantics'],
          codeExample: `const developer = "Alex";
let streak = 7;
console.log(\`Developer \${developer} is on a \${streak}-day streak!\`);`,
          quickExercise: 'What is the result of typeof null in JavaScript? (Answer: "object" due to a historical quirk)'
        },
        {
          id: 'js_02',
          title: 'Functions, Arrow Functions, and Scope',
          level: 'Beginner',
          duration: '30 mins',
          description: 'Function declarations vs expressions, arrow functions, lexical this, default parameters, rest parameters, and spread operator.',
          keyConcepts: ['Arrow Functions & Lexical this', 'Rest (...args) and Spread (...arr)', 'First-Class Functions', 'Block vs Function Scope'],
          codeExample: `const calculateAverage = (...numbers) => {
  const sum = numbers.reduce((acc, curr) => acc + curr, 0);
  return sum / numbers.length;
};

console.log("Average:", calculateAverage(80, 90, 100)); // 90`,
          quickExercise: 'Do arrow functions have their own "this" binding? (Answer: No, they inherit "this" from the enclosing scope)'
        }
      ],
      intermediate: [
        {
          id: 'js_03',
          title: 'Objects, Arrays, and Modern Array Methods',
          level: 'Intermediate',
          duration: '40 mins',
          description: 'Object destructuring, property shorthand, array manipulation with map(), filter(), reduce(), find(), some(), every(), and flatMap().',
          keyConcepts: ['Immutability with map/filter', 'reduce() accumulator patterns', 'Destructuring & Renaming', 'Optional Chaining (?.)'],
          codeExample: `const tasks = [
  { id: 1, title: "Review PR", priority: "High", completed: true },
  { id: 2, title: "Fix bug", priority: "Medium", completed: false },
  { id: 3, title: "Write tests", priority: "High", completed: false }
];

const highPriorityIncomplete = tasks
  .filter(t => t.priority === "High" && !t.completed)
  .map(t => t.title);

console.log("Urgent Tasks:", highPriorityIncomplete);`,
          quickExercise: 'What does Array.prototype.reduce() return? (Answer: A single accumulated value of any type)'
        },
        {
          id: 'js_04',
          title: 'DOM Manipulation, Events, and Event Delegation',
          level: 'Intermediate',
          duration: '45 mins',
          description: 'Querying DOM elements, modifying classes/styles, event listeners, event propagation (bubbling vs capturing), and event delegation.',
          keyConcepts: ['querySelector & querySelectorAll', 'addEventListener & Event Object', 'Event Bubbling & stopPropagation()', 'Event Delegation efficiency'],
          codeExample: `// Event Delegation Pattern
// document.getElementById('taskList').addEventListener('click', (e) => {
//   if (e.target.matches('button.delete-btn')) {
//     e.target.closest('li').remove();
//   }
// });`,
          quickExercise: 'Why is event delegation more efficient than attaching listeners to each child element? (Answer: Saves memory by using a single listener on the parent)'
        }
      ],
      advanced: [
        {
          id: 'js_05',
          title: 'Asynchronous JavaScript: Promises & Async/Await',
          level: 'Advanced',
          duration: '50 mins',
          description: 'Callback hell vs Promises, async/await syntax, try/catch, Promise.all, Promise.allSettled, Promise.race, and Microtask queue.',
          keyConcepts: ['Promise States (pending, fulfilled, rejected)', 'async/await syntax', 'Promise.all concurrency', 'Error boundaries & try/catch'],
          codeExample: `async function fetchUserData(userId) {
  try {
    const res = await fetch(\`https://jsonplaceholder.typicode.com/users/\${userId}\`);
    if (!res.ok) throw new Error(\`HTTP error! status: \${res.status}\`);
    const data = await res.json();
    console.log("User:", data.name, "-", data.email);
  } catch (err) {
    console.error("Fetch failed:", err.message);
  }
}

fetchUserData(1);`,
          quickExercise: 'What happens if one Promise in Promise.all() rejects? (Answer: The whole Promise.all rejects immediately)'
        },
        {
          id: 'js_06',
          title: 'Event Loop, Call Stack, and Concurrency Model',
          level: 'Advanced',
          duration: '45 mins',
          description: 'How JavaScript executes single-threaded async code: Call Stack, Web APIs, Macrotask Queue (setTimeout, setInterval), and Microtask Queue (Promises, queueMicrotask).',
          keyConcepts: ['Single-Threaded Non-Blocking I/O', 'Call Stack execution', 'Microtasks run before Macrotasks', 'Starvation risks'],
          codeExample: `console.log("1. Synchronous");

setTimeout(() => console.log("4. Macrotask (Timeout)"), 0);

Promise.resolve().then(() => console.log("3. Microtask (Promise)"));

console.log("2. Synchronous");
// Output order: 1, 2, 3, 4`,
          quickExercise: 'Which runs first after synchronous code: a Promise.then() callback or a setTimeout(..., 0) callback? (Answer: Promise.then because Microtasks have priority)'
        }
      ],
      projects: [
        {
          id: 'js_07',
          title: 'Practical Project: Real-Time Kanban Board Web App',
          level: 'Project',
          duration: '2.5 hours',
          description: 'Develop a full-featured JavaScript task management board with drag-and-drop event handling, localStorage persistence, and live search.',
          keyConcepts: ['HTML5 Drag & Drop API', 'State management patterns', 'localStorage synchronization', 'CSS transition triggers'],
          codeExample: `// State-driven UI render pattern
function renderBoard(columns, tasks) {
  console.log("Rendering Kanban state with", tasks.length, "tasks");
}`,
          quickExercise: 'How do you prevent the default browser behavior during dragover? (Answer: e.preventDefault())'
        }
      ]
    }
  },

  html: {
    id: 'html',
    name: 'HTML5',
    icon: '🌐',
    badge: 'Structure',
    color: '#f97316',
    description: 'Learn modern semantic HTML5, web accessibility (a11y), forms, SEO metadata, and media elements.',
    levels: {
      beginner: [
        {
          id: 'html_01',
          title: 'HTML5 Document Structure and Semantics',
          level: 'Beginner',
          duration: '25 mins',
          description: '<!DOCTYPE html>, <html>, <head>, <body>, semantic tags (<header>, <nav>, <main>, <section>, <article>, <aside>, <footer>).',
          keyConcepts: ['Semantic vs Div-Soup', 'Document Outline', 'Character Encoding UTF-8', 'Viewport Meta Tag'],
          codeExample: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>TechVerse App</title>
</head>
<body>
  <header><h1>TechVerse</h1></header>
  <main><p>Learn. Build. Innovate.</p></main>
</body>
</html>`,
          quickExercise: 'Why are semantic tags preferable over generic <div> tags? (Answer: Better accessibility, screen reader navigation, and SEO)'
        }
      ],
      intermediate: [
        {
          id: 'html_02',
          title: 'Forms, Input Validation, and Accessibility',
          level: 'Intermediate',
          duration: '35 mins',
          description: 'Form elements, modern input types (email, number, date), required/pattern attributes, label association, and ARIA roles.',
          keyConcepts: ['<label for="id"> pairing', 'Client-side input constraints', 'ARIA labels & attributes', 'Form submission semantics'],
          codeExample: `<form action="/api/submit" method="POST">
  <label for="userEmail">Email Address:</label>
  <input type="email" id="userEmail" name="email" required placeholder="alex@student.edu">
  <button type="submit">Enroll Now</button>
</form>`,
          quickExercise: 'Why must every form input have an associated <label>? (Answer: For accessibility screen readers and click-focus target area)'
        }
      ],
      advanced: [
        {
          id: 'html_03',
          title: 'SEO Meta Tags, Open Graph, and Web Components',
          level: 'Advanced',
          duration: '40 mins',
          description: 'Search engine optimization tags, canonical URLs, Open Graph (<meta property="og:...">), Twitter cards, and custom HTML Web Components.',
          keyConcepts: ['Open Graph protocol', 'Canonical link tags', 'Favicons & manifest.json', 'Custom Elements (customElements.define)'],
          codeExample: `<meta name="description" content="TechVerse - AI-Powered Tech Learning Platform">
<meta property="og:title" content="TechVerse">
<meta property="og:description" content="Learn. Build. Innovate.">
<meta property="og:image" content="https://techverse.dev/preview.png">`,
          quickExercise: 'What is the purpose of the canonical link tag? (Answer: Prevents duplicate content penalties by specifying the master URL)'
        }
      ],
      projects: [
        {
          id: 'html_04',
          title: 'Practical Project: Accessible Technical Documentation Site',
          level: 'Project',
          duration: '1.5 hours',
          description: 'Build a fully semantic, WCAG-compliant technical documentation layout featuring skip links, landmark roles, and responsive media.',
          keyConcepts: ['Skip to Content Links', 'Semantic Landmarks', 'Accessible Tables & Code Blocks', 'High-Contrast Content'],
          codeExample: `<a href="#mainContent" class="skip-link">Skip to main content</a>
<main id="mainContent">
  <h2>API Documentation</h2>
</main>`,
          quickExercise: 'What role do "skip links" play for keyboard-only users? (Answer: Allows skipping repetitive navigation links directly to main content)'
        }
      ]
    }
  },

  css: {
    id: 'css',
    name: 'CSS3',
    icon: '🎨',
    badge: 'Styling',
    color: '#3b82f6',
    description: 'Master modern CSS, Flexbox, CSS Grid, custom properties (variables), transitions, animations, and responsive layouts.',
    levels: {
      beginner: [
        {
          id: 'css_01',
          title: 'CSS Selectors, Specificity, and Box Model',
          level: 'Beginner',
          duration: '30 mins',
          description: 'Element, class, ID selectors, specificity calculation (0-0-0), margin, border, padding, content, and box-sizing: border-box.',
          keyConcepts: ['box-sizing: border-box', 'Specificity Hierarchy', 'Margin collapsing', 'Inheritance'],
          codeExample: `* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.card {
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
}`,
          quickExercise: 'What does "box-sizing: border-box" do? (Answer: Includes padding and border within the element’s total specified width and height)'
        }
      ],
      intermediate: [
        {
          id: 'css_02',
          title: 'Flexbox and CSS Grid Architecture',
          level: 'Intermediate',
          duration: '45 mins',
          description: '1D layouts with Flexbox (justify-content, align-items, flex-grow, flex-shrink), and 2D layouts with CSS Grid (grid-template-columns, repeat, minmax, gap).',
          keyConcepts: ['Flexbox 1D vs Grid 2D', 'repeat(auto-fit, minmax(...))', 'Alignment properties', 'Gap utility'],
          codeExample: `/* Responsive Grid without media queries */
.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}`,
          quickExercise: 'What is the difference between "auto-fit" and "auto-fill" in CSS Grid? (Answer: auto-fit expands items to fill empty track space)'
        },
        {
          id: 'css_03',
          title: 'Responsive Design & Modern Media Queries',
          level: 'Intermediate',
          duration: '35 mins',
          description: 'Mobile-first design principles, breakpoint strategies, relative units (rem, em, ch, vw, vh, dvh), and modern range syntax (@media (width <= 768px)).',
          keyConcepts: ['Mobile-first philosophy', 'rem vs em units', 'Dynamic Viewport units (dvh)', 'Modern range media query syntax'],
          codeExample: `@media (max-width: 768px) {
  .layout {
    flex-direction: column;
  }
  .sidebar {
    position: fixed;
    transform: translateX(-100%);
  }
}`,
          quickExercise: 'What is the base reference for 1rem? (Answer: The font-size of the root <html> element, typically 16px)'
        }
      ],
      advanced: [
        {
          id: 'css_04',
          title: 'CSS Variables, Themes, and Glassmorphism',
          level: 'Advanced',
          duration: '40 mins',
          description: 'Defining and cascading CSS Custom Properties (--var), building dark/light theme switchers, backdrop-filter blur, and smooth transitions.',
          keyConcepts: ['CSS Custom Properties (--token)', 'Theme swapping with data-theme', 'backdrop-filter: blur()', 'Hardware-accelerated transitions'],
          codeExample: `:root {
  --primary: #8b5cf6;
  --bg-card: rgba(18, 26, 43, 0.75);
}

.glass-panel {
  background: var(--bg-card);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 18px;
}`,
          quickExercise: 'Why should you transition "transform" and "opacity" instead of "width" or "top"? (Answer: They are computed by the GPU on the compositor thread)'
        }
      ],
      projects: [
        {
          id: 'css_05',
          title: 'Practical Project: Premium Developer Dashboard Theme System',
          level: 'Project',
          duration: '2 hours',
          description: 'Build a production-grade UI design system stylesheet featuring reusable tokens, dark/light modes, typography hierarchy, and glass card components.',
          keyConcepts: ['Design Token Architecture', 'Fluid Typography with clamp()', 'Theme Variables', 'CSS Reset & Utilities'],
          codeExample: `h1 {
  font-size: clamp(1.75rem, 4vw, 2.75rem);
}`,
          quickExercise: 'What does the clamp(min, val, max) function achieve? (Answer: Dynamically scales a value between a lower and upper bound)'
        }
      ]
    }
  },

  sql: {
    id: 'sql',
    name: 'SQL & Databases',
    icon: '🗄️',
    badge: 'Data Core',
    color: '#10b981',
    description: 'Master relational databases, SQL queries, Joins, subqueries, normalization, indexing, and query optimization.',
    levels: {
      beginner: [
        {
          id: 'sql_01',
          title: 'Relational Model and Basic Queries',
          level: 'Beginner',
          duration: '30 mins',
          description: 'Tables, rows, columns, primary keys, SELECT, WHERE filtering, ORDER BY sorting, LIMIT pagination, and NULL handling.',
          keyConcepts: ['Primary Keys & Unique Constraints', 'WHERE comparisons (LIKE, IN, BETWEEN)', 'ORDER BY ASC/DESC', 'IS NULL vs = NULL'],
          codeExample: `-- Select active computer science students
SELECT student_id, name, gpa 
FROM students 
WHERE course = 'Computer Science' AND gpa >= 3.5 
ORDER BY gpa DESC 
LIMIT 10;`,
          quickExercise: 'Why does "WHERE column = NULL" never match in SQL? (Answer: NULL represents unknown, so you must use "IS NULL")'
        },
        {
          id: 'sql_02',
          title: 'Aggregations and Grouping (GROUP BY & HAVING)',
          level: 'Beginner',
          duration: '35 mins',
          description: 'Aggregate functions: COUNT, SUM, AVG, MIN, MAX. Grouping rows with GROUP BY, and filtering aggregated groups with HAVING.',
          keyConcepts: ['Aggregate functions', 'GROUP BY clause', 'HAVING vs WHERE', 'SQL Order of Execution'],
          codeExample: `-- Average GPA per university department
SELECT department, COUNT(*) AS student_count, ROUND(AVG(gpa), 2) AS avg_gpa
FROM students
GROUP BY department
HAVING COUNT(*) >= 5
ORDER BY avg_gpa DESC;`,
          quickExercise: 'What is the order of execution between WHERE, GROUP BY, and HAVING? (Answer: WHERE -> GROUP BY -> HAVING)'
        }
      ],
      intermediate: [
        {
          id: 'sql_03',
          title: 'SQL Joins (INNER, LEFT, RIGHT, FULL OUTER)',
          level: 'Intermediate',
          duration: '45 mins',
          description: 'Relational data linking: Foreign keys, INNER JOIN, LEFT OUTER JOIN, RIGHT JOIN, FULL JOIN, and CROSS JOIN with Venn diagrams.',
          keyConcepts: ['Foreign Key references', 'INNER JOIN (matches in both)', 'LEFT JOIN (preserve left table)', 'Multi-table join chains'],
          codeExample: `-- Join students with their enrolled courses
SELECT s.name, c.course_title, e.grade
FROM students s
INNER JOIN enrollments e ON s.student_id = e.student_id
INNER JOIN courses c ON e.course_id = c.course_id
WHERE e.grade = 'A';`,
          quickExercise: 'What rows does a LEFT JOIN return if there is no match in the right table? (Answer: All left rows with NULL for right columns)'
        },
        {
          id: 'sql_04',
          title: 'Subqueries, CTEs, and Window Functions',
          level: 'Intermediate',
          duration: '50 mins',
          description: 'Subqueries (scalar, correlated), Common Table Expressions (WITH clause), and Window functions (ROW_NUMBER(), RANK(), DENSE_RANK(), OVER(PARTITION BY)).',
          keyConcepts: ['Common Table Expressions (WITH cte AS ...)', 'Correlated Subqueries', 'OVER (PARTITION BY ... ORDER BY ...)', 'Ranking Functions'],
          codeExample: `-- Rank students by GPA within their respective department
WITH RankedStudents AS (
  SELECT name, department, gpa,
         DENSE_RANK() OVER (PARTITION BY department ORDER BY gpa DESC) AS dept_rank
  FROM students
)
SELECT * FROM RankedStudents WHERE dept_rank <= 3;`,
          quickExercise: 'How does DENSE_RANK() differ from RANK() when ties occur? (Answer: DENSE_RANK does not skip ranks after ties, e.g. 1, 1, 2)'
        }
      ],
      advanced: [
        {
          id: 'sql_05',
          title: 'Database Normalization (1NF to BCNF)',
          level: 'Advanced',
          duration: '45 mins',
          description: 'Eliminating data redundancy and update anomalies: 1NF (atomicity), 2NF (no partial key dependencies), 3NF (no transitive dependencies), and BCNF.',
          keyConcepts: ['Data Anomalies (Insertion, Update, Deletion)', 'Functional Dependencies (X -> Y)', '1NF, 2NF, 3NF criteria', 'Boyce-Codd Normal Form (BCNF)'],
          codeExample: `-- Normalized Schema: Students and Courses Separated
CREATE TABLE departments (
    dept_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE students (
    student_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    dept_id INT REFERENCES departments(dept_id)
);`,
          quickExercise: 'What dependency does 3NF eliminate? (Answer: Transitive dependencies on non-prime attributes)'
        },
        {
          id: 'sql_06',
          title: 'Indexing, Query Optimization, and Transactions',
          level: 'Advanced',
          duration: '50 mins',
          description: 'B-Tree indexes, composite indexes, EXPLAIN ANALYZE, query execution plans, transactions (BEGIN, COMMIT, ROLLBACK), and ACID properties.',
          keyConcepts: ['B-Tree Index lookups', 'Index Scan vs Sequential Scan', 'Composite Index column order', 'ACID Transactions & Isolation Levels'],
          codeExample: `-- Create index for accelerated lookups
CREATE INDEX idx_students_dept_gpa ON students (dept_id, gpa DESC);

-- View query execution plan
EXPLAIN ANALYZE
SELECT * FROM students WHERE dept_id = 4 AND gpa > 3.5;`,
          quickExercise: 'Why can having too many indexes slow down INSERT and UPDATE statements? (Answer: Every insert/update requires updating all affected index trees)'
        }
      ],
      projects: [
        {
          id: 'sql_07',
          title: 'Practical Project: University Course Management DB Schema',
          level: 'Project',
          duration: '2 hours',
          description: 'Design and deploy a normalized 3NF database schema for a university grading, student enrollment, and course scheduling system.',
          keyConcepts: ['DDL Schema Design', 'Referential Integrity & Cascades', 'Stored Views', 'Analytical Aggregation Queries'],
          codeExample: `CREATE VIEW student_gpa_summary AS
SELECT s.student_id, s.name, ROUND(AVG(e.numeric_grade), 2) AS cumulative_gpa
FROM students s
JOIN enrollments e ON s.student_id = e.student_id
GROUP BY s.student_id, s.name;`,
          quickExercise: 'What is a SQL VIEW? (Answer: A stored query that acts as a virtual table)'
        }
      ]
    }
  },

  git: {
    id: 'git',
    name: 'Git & GitHub',
    icon: '🐙',
    badge: 'Workflow',
    color: '#f43f5e',
    description: 'Master version control, branches, merge conflicts, rebasing, pull requests, and GitHub Actions CI/CD.',
    levels: {
      beginner: [
        {
          id: 'git_01',
          title: 'Git Architecture, Repositories, and Basic Commits',
          level: 'Beginner',
          duration: '25 mins',
          description: 'Working Directory, Staging Area (Index), and Local Repository (.git). git init, git add, git commit -m, git status, and git log.',
          keyConcepts: ['The 3 Git States (Modified, Staged, Committed)', 'SHA-1 Commit Hashes', 'Commit messages best practices', '.gitignore rules'],
          codeExample: `# Initializing and committing
git init
git add .
git commit -m "feat: initial commit for TechVerse project"
git status`,
          quickExercise: 'What file specifies files and directories Git should ignore? (Answer: .gitignore)'
        }
      ],
      intermediate: [
        {
          id: 'git_02',
          title: 'Branching, Merging, and Resolving Conflicts',
          level: 'Intermediate',
          duration: '40 mins',
          description: 'Feature branch workflows: git branch, git checkout / git switch, git merge, fast-forward merges, and resolving merge conflict markers.',
          keyConcepts: ['git switch -c feature-branch', 'Fast-Forward vs 3-Way Merge', 'Conflict markers (<<<<<<<, =======, >>>>>>>)', 'git branch -d deletion'],
          codeExample: `# Creating and merging a feature branch
git switch -c feature/code-lab
# ... make edits ...
git commit -am "feat: implement interactive code runner"
git switch main
git merge feature/code-lab`,
          quickExercise: 'What does git checkout -b (or git switch -c) do? (Answer: Creates a new branch and switches to it in one command)'
        },
        {
          id: 'git_03',
          title: 'Remote Repositories: Push, Pull, and Fetch',
          level: 'Intermediate',
          duration: '35 mins',
          description: 'Working with remote hosts (GitHub, GitLab): git remote add origin, git push -u origin main, git fetch vs git pull, and tracking branches.',
          keyConcepts: ['git fetch vs git pull (fetch + merge)', 'Tracking upstream branches', 'SSH vs HTTPS authentication', 'git clone'],
          codeExample: `# Linking to GitHub and pushing
git remote add origin https://github.com/developer/focusflow.git
git branch -M main
git push -u origin main`,
          quickExercise: 'What is the difference between git fetch and git pull? (Answer: fetch downloads remote changes without merging; pull fetches and automatically merges)'
        }
      ],
      advanced: [
        {
          id: 'git_04',
          title: 'Rebasing, Stashing, and Interactive History',
          level: 'Advanced',
          duration: '45 mins',
          description: 'Clean commit histories with git rebase, interactive rebase (git rebase -i), squashing commits, git stash, and recovering commits with git reflog.',
          keyConcepts: ['git rebase vs git merge', 'Golden Rule of Rebasing (Never rebase public shared branches)', 'git stash and git stash pop', 'git reflog safety net'],
          codeExample: `# Clean interactive rebase to squash last 3 commits
git rebase -i HEAD~3

# Stashing temporary changes
git stash
git pull --rebase origin main
git stash pop`,
          quickExercise: 'How can you recover a commit that was accidentally deleted or lost in a rebase? (Answer: Using git reflog)'
        },
        {
          id: 'git_05',
          title: 'Pull Requests, Code Reviews, and GitHub Actions CI/CD',
          level: 'Advanced',
          duration: '45 mins',
          description: 'GitHub collaboration workflows: Pull Requests, code review comments, branch protection rules, and automating builds/tests with GitHub Actions YAML.',
          keyConcepts: ['Pull Request lifecycle', 'Branch Protection rules', '.github/workflows/ci.yml', 'Continuous Integration triggers (on: [push, pull_request])'],
          codeExample: `# Sample GitHub Actions CI Workflow (.github/workflows/test.yml)
name: CI Test Suite
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Use Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run build`,
          quickExercise: 'Where are GitHub Actions workflow files stored in a repository? (Answer: In the .github/workflows directory)'
        }
      ],
      projects: [
        {
          id: 'git_06',
          title: 'Practical Project: Open-Source Contribution Workflow',
          level: 'Project',
          duration: '1.5 hours',
          description: 'Simulate contributing to a production open-source repository: forking, setting upstream remotes, syncing branches, creating PRs with semantic commit messages.',
          keyConcepts: ['Fork & Upstream Sync', 'Semantic Commits (feat, fix, docs, refactor)', 'Squash and Merge', 'PR Templates'],
          codeExample: `# Adding upstream and syncing fork
git remote add upstream https://github.com/original-org/repo.git
git fetch upstream
git merge upstream/main`,
          quickExercise: 'What is the purpose of configuring an "upstream" remote? (Answer: To track and synchronize changes from the original repository you forked)'
        }
      ]
    }
  },
  typescript: {
    id: 'typescript',
    name: 'TypeScript',
    icon: '🔷',
    badge: 'Trending',
    color: '#3178c6',
    category: 'Web Development',
    difficulty: 'Intermediate',
    topics: ['Static Typing', 'Interfaces & Types', 'Generics', 'Utility Types', 'TSConfig'],
    description: 'Typed superset of JavaScript providing compile-time type safety, interfaces, and modern tooling for scale.',
    levels: {
      beginner: [
        {
          id: 'ts_01',
          title: 'TypeScript Fundamentals & Type Annotations',
          level: 'Beginner',
          duration: '25 mins',
          description: 'Type inference, explicit primitives (string, number, boolean), union types, and type aliases.',
          keyConcepts: ['Type Inference', 'Union Types (A | B)', 'Type Aliases', 'Strict Null Checks'],
          codeExample: `type UserID = string | number;

interface User {
  id: UserID;
  username: string;
  isActive: boolean;
}

const user: User = { id: "u_101", username: "alex", isActive: true };`,
          commonMistakes: 'Using "any" instead of specific types or "unknown" disables type safety.',
          quickExercise: 'What is the difference between "any" and "unknown" in TypeScript? (Answer: "unknown" forces a type check before operations can be performed)'
        }
      ],
      intermediate: [
        {
          id: 'ts_02',
          title: 'Generics and Utility Types',
          level: 'Intermediate',
          duration: '35 mins',
          description: 'Reusable components with generics, Partial, Required, Pick, Omit, and Record utility types.',
          keyConcepts: ['Generic Constraints (<T extends object>)', 'Pick<T, K>', 'Omit<T, K>', 'Record<K, V>'],
          codeExample: `function wrapInResponse<T>(data: T, status: number = 200) {
  return { data, status, timestamp: Date.now() };
}

const response = wrapInResponse<{ token: string }>({ token: "xyz123" });`,
          commonMistakes: 'Over-constraining generics or avoiding generics when multiple types share identical structure.',
          quickExercise: 'What does Partial<User> do? (Answer: Makes all properties in User optional)'
        }
      ],
      advanced: [],
      projects: []
    }
  },
  go: {
    id: 'go',
    name: 'Go (Golang)',
    icon: '🐹',
    badge: 'High Performance',
    color: '#00add8',
    category: 'Systems Programming',
    difficulty: 'Intermediate',
    topics: ['Goroutines', 'Channels', 'Structs & Interfaces', 'Pointers', 'Microservices'],
    description: 'Concurrent, garbage-collected language designed by Google for cloud infrastructure, microservices, and high-throughput systems.',
    levels: {
      beginner: [
        {
          id: 'go_01',
          title: 'Go Syntax, Structs and Packages',
          level: 'Beginner',
          duration: '30 mins',
          description: 'Packages, imports, strongly-typed variables, structs, error-handling conventions (val, err := ...).',
          keyConcepts: ['Explicit Error Returns', 'Struct Composition', 'Multiple Return Values', 'Pointers'],
          codeExample: `package main
import "fmt"

type Server struct {
    Host string
    Port int
}

func main() {
    srv := Server{Host: "localhost", Port: 8080}
    fmt.Printf("Server listening on %s:%d\\n", srv.Host, srv.Port)
}`,
          commonMistakes: 'Ignoring returned error values instead of checking "if err != nil".',
          quickExercise: 'How does Go represent inheritance? (Answer: Through struct embedding and composition rather than class hierarchies)'
        }
      ],
      intermediate: [
        {
          id: 'go_02',
          title: 'Concurrency with Goroutines & Channels',
          level: 'Intermediate',
          duration: '40 mins',
          description: 'Lightweight threads (goroutines), channel communication, select statements, and sync.WaitGroup synchronization.',
          keyConcepts: ['Goroutines (go worker())', 'Buffered vs Unbuffered Channels', 'Select statement', 'sync.WaitGroup'],
          codeExample: `package main
import (
    "fmt"
    "time"
)

func worker(id int, ch chan string) {
    ch <- fmt.Sprintf("Worker %d finished", id)
}

func main() {
    ch := make(chan string)
    go worker(1, ch)
    msg := <-ch
    fmt.Println(msg)
}`,
          commonMistakes: 'Deadlocking by reading from unbuffered channels without an active writing goroutine.',
          quickExercise: 'What keyword spawns a new goroutine? (Answer: go)'
        }
      ],
      advanced: [],
      projects: []
    }
  },
  rust: {
    id: 'rust',
    name: 'Rust',
    icon: '🦀',
    badge: 'Memory Safe',
    color: '#dea584',
    category: 'Systems Programming',
    difficulty: 'Advanced',
    topics: ['Ownership & Borrowing', 'Lifetimes', 'Pattern Matching', 'Zero-Cost Abstractions', 'Cargo'],
    description: 'Systems language empowering everyone to build reliable and efficient software with guaranteed memory safety without a garbage collector.',
    levels: {
      beginner: [
        {
          id: 'rust_01',
          title: 'Ownership, Borrowing & References',
          level: 'Beginner',
          duration: '35 mins',
          description: 'Rust unique memory model: single owner rule, immutable borrowing (&T), and mutable borrowing (&mut T).',
          keyConcepts: ['Move Semantics', 'Borrow Checker', 'Immutable References', 'Exclusive Mutable References'],
          codeExample: `fn main() {
    let mut greeting = String::from("Hello");
    add_world(&mut greeting);
    println!("{}", greeting);
}

fn add_world(s: &mut String) {
    s.push_str(", TechVerse!");
}`,
          commonMistakes: 'Attempting to have simultaneous mutable and immutable references in the same scope.',
          quickExercise: 'Does Rust use a garbage collector? (Answer: No, memory is reclaimed via ownership and compile-time drop semantics)'
        }
      ],
      intermediate: [
        {
          id: 'rust_02',
          title: 'Enums, Option, Result & Pattern Matching',
          level: 'Intermediate',
          duration: '40 mins',
          description: 'Type-safe error handling with Option<T> and Result<T, E>, pattern matching with match, and the ? operator.',
          keyConcepts: ['Option (Some/None)', 'Result (Ok/Err)', 'match expressions', '? error propagation operator'],
          codeExample: `fn divide(a: f64, b: f64) -> Result<f64, String> {
    if b == 0.0 {
        Err(String::from("Cannot divide by zero"))
    } else {
        Ok(a / b)
    }
}

fn main() {
    match divide(10.0, 2.0) {
        Ok(res) => println!("Result: {}", res),
        Err(e) => println!("Error: {}", e),
    }
}`,
          commonMistakes: 'Calling .unwrap() in production code instead of handling Err or None states.',
          quickExercise: 'What is the purpose of the ? operator in Rust? (Answer: Early returns Err if a Result is Err, otherwise unwraps Ok)'
        }
      ],
      advanced: [],
      projects: []
    }
  }
};
