import sys
sys.path.append('./lib')
import jionlp as jio
msg = sys.argv[1]

print(jio.parse_time(msg))
