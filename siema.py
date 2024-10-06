import tkinter

def set_tile(row, column):
    pass

def new_game():
    pass

playerX = "X"
playerO = "O"
curr_player = playerX
board = [[0, 0, 0],[0, 0, 0],[0, 0, 0]] 

color_blue = "#4584b6"
color_yellow = "#ffde57"
color_gray = "#343434"
color_light_gray = "#646464"

window = tkinter.Tk()
window.title("Tic Tac Toe")
window.resizable(False, False)

frame = tkinter.Frame(window)
label = tkinter.Label(frame,
                      text=curr_player+"'s turn", 
                      font=("Consolas", 20), 
                      background=color_gray,
                      foreground="white")

label.grid(row=0, column=0, columnspan=3, sticky="we")

for row in range(3):
    for column in range(3):
        board[row][column] = tkinter.Button(frame, text="", font=("Consolas", 50, "bold"),
                                            background=color_gray, foreground=color_blue, width=4, height=1,
                                            command=lambda row=row, column=column: set_tile(row, column))
        board[row][column].grid(row=row+1, column=column)

button = tkinter.Button(frame, text="restart", font=("Consolas", 20), background=color_gray,
                        foreground="white", command=new_game)
button.grid(row=4, column=0, columnspan=3, sticky="we")

frame.pack()


window.update()
window_width = window.winfo_width()
window_haight = window.winfo_height()
screen_width = window.winfo_screenwidth()
screen_haight = window.winfo_screenheight()

window_x = int((screen_width/2) - (window_width/2))
window_y = int((screen_haight/2) - (window_haight/2))


window.geometry(f"{window_width}x{window_haight}+{window_x}+{window_y}")

window.mainloop()