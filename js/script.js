// JavaScript para o Calendário

const monthSelector = document.getElementById('monthSelector');
const yearSelector = document.getElementById('yearSelector');
const calendarBody = document.getElementById('calendarBody');
const currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

// Preenche o seletor de ano de 1940 até 2100
for (let i = 1940; i <= 2100; i++) {
    let option = document.createElement('option');
    option.value = i;
    option.textContent = i;
    yearSelector.appendChild(option);
}
yearSelector.value = currentYear;

// Função para gerar o calendário com base no mês e ano selecionados
function generateCalendar(month, year) {
    calendarBody.innerHTML = '';
    const firstDay = new Date(year, month).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    let date = 1;
    for (let i = 0; i < 6; i++) {
        let row = document.createElement('tr');

        for (let j = 0; j < 7; j++) {
            let cell = document.createElement('td');
            if (i === 0 && j < firstDay) {
                cell.innerHTML = ''; // Células vazias antes do primeiro dia do mês
            } else if (date > daysInMonth) {
                break; // Saímos quando a data excede o número de dias no mês
            } else {
                cell.innerHTML = date;
                cell.addEventListener('click', function () {
                    openEventModal(cell, date, month, year);
                });
                date++;
            }
            row.appendChild(cell);
        }
        calendarBody.appendChild(row);
    }
}

// Abrir o modal para adicionar evento
function openEventModal(cell, date, month, year) {
    let modal = document.getElementById("eventModal");
    modal.style.display = "block";

    document.querySelector(".close").onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    document.getElementById("submitEvent").onclick = function() {
        let eventName = document.getElementById("eventName").value;
        let eventTime = document.getElementById("eventTime").value;

        if (eventName) {
            let heart = document.createElement('div');
            heart.className = 'heart';
            cell.appendChild(heart);

            heart.setAttribute('data-info', eventName + (eventTime ? " às " + eventTime : ""));

            heart.onclick = function() {
                let infoModal = document.getElementById("infoModal");
                infoModal.style.display = "block";
                document.getElementById("infoEvent").innerText = heart.getAttribute('data-info');
            }

            modal.style.display = "none";
        }
    }
}

// Fecha o modal de informações do evento
document.querySelector(".close-info").onclick = function() {
    document.getElementById("infoModal").style.display = "none";
}

window.onclick = function(event) {
    if (event.target == document.getElementById("infoModal")) {
        document.getElementById("infoModal").style.display = "none";
    }
}

// Atualiza o calendário quando o mês ou ano são alterados
monthSelector.addEventListener('change', function() {
    currentMonth = parseInt(this.value);
    generateCalendar(currentMonth, currentYear);
});

yearSelector.addEventListener('change', function() {
    currentYear = parseInt(this.value);
    generateCalendar(currentMonth, currentYear);
});

// Gera o calendário inicial
generateCalendar(currentMonth, currentYear);

// JavaScript para Lista de Tarefas

const addTaskButton = document.querySelector('#addTaskButton');
const addTaskModal = document.getElementById('addTaskModal');
const closeTaskModal = addTaskModal.querySelector('.close');
const submitNewTask = document.getElementById('submitNewTask');
const newTaskInput = document.getElementById('newTaskInput');
const taskList = document.getElementById('taskList');

// Abrir modal
addTaskButton.addEventListener('click', () => {
    addTaskModal.style.display = 'block';
});

// Fechar modal
closeTaskModal.addEventListener('click', () => {
    addTaskModal.style.display = 'none';
});

// Adicionar nova tarefa
submitNewTask.addEventListener('click', () => {
    const taskName = newTaskInput.value.trim();
    if (taskName && taskName.length <= 50) {
        addTask(taskName, false); // Inicialmente, a tarefa não está concluída
        newTaskInput.value = '';
        addTaskModal.style.display = 'none';
    } else {
        alert('A tarefa deve ter no máximo 50 caracteres.');
    }
});

// Função para adicionar tarefa
function addTask(taskName, isCompleted) {
    const li = document.createElement('li');
    li.textContent = taskName;
    li.dataset.completed = isCompleted; // Armazena o estado como um atributo de dados
    if (isCompleted) {
        li.classList.add('completed');
    }

    // Adicionar ícones de edição e exclusão
    const actionsDiv = document.createElement('div');
    actionsDiv.className = 'task-actions';

    const editIcon = document.createElement('span');
    editIcon.className = 'edit';
    editIcon.innerHTML = '⚙️'; // Ícone de engrenagem
    editIcon.addEventListener('click', (e) => {
        e.stopPropagation();
        openEditModal(li);
    });

    const deleteIcon = document.createElement('span');
    deleteIcon.className = 'delete';
    deleteIcon.innerHTML = '🗑️'; // Ícone de lixeira
    deleteIcon.addEventListener('click', (e) => {
        e.stopPropagation();
        li.remove();
    });

    actionsDiv.appendChild(editIcon);
    actionsDiv.appendChild(deleteIcon);
    li.appendChild(actionsDiv);

    li.addEventListener('click', () => {
        const currentState = li.dataset.completed === 'true';
        li.dataset.completed = !currentState;
        li.classList.toggle('completed');
    });

    taskList.appendChild(li);
}

// Função para abrir o modal de edição
function openEditModal(taskItem) {
    const editTaskModal = document.getElementById('editTaskModal');
    const editTaskInput = document.getElementById('editTaskInput');
    const saveEditTaskButton = document.getElementById('saveEditTaskButton');

    editTaskInput.value = taskItem.firstChild.textContent;
    editTaskModal.style.display = 'block';

    saveEditTaskButton.onclick = () => {
        const newTaskName = editTaskInput.value.trim();
        if (newTaskName && newTaskName.length <= 50) {
            taskItem.firstChild.textContent = newTaskName;
            editTaskModal.style.display = 'none';
        } else {
            alert('A tarefa deve ter no máximo 50 caracteres.');
        }
    };
}

// Fechar o modal de edição
document.getElementById('closeEditTaskModal').onclick = () => {
    document.getElementById('editTaskModal').style.display = 'none';
};

// Fechar modal se clicar fora dela
window.addEventListener('click', (event) => {
    if (event.target === addTaskModal) {
        addTaskModal.style.display = 'none';
    }
});

// JavaScript para Anotações

const saveNoteButton = document.getElementById('saveNoteButton');
const noteInput = document.getElementById('noteInput');
const notesList = document.querySelector('.notes-list');

// Adicionar nova anotação
document.getElementById('saveNoteButton').addEventListener('click', () => {
    const noteContent = document.getElementById('noteInput').value.trim();
    if (noteContent && noteContent.length <= 255) {
        addNote(noteContent);
        document.getElementById('noteInput').value = '';
    }
});

// Função para adicionar anotação
function addNote(noteContent) {
    const li = document.createElement('li');
    li.textContent = noteContent;

    // Adicionar ícones de edição e exclusão
    const actionsDiv = document.createElement('div');
    actionsDiv.className = 'note-actions';

    const editIcon = document.createElement('span');
    editIcon.className = 'edit';
    editIcon.innerHTML = '⚙️'; // Ícone de engrenagem
    editIcon.addEventListener('click', (e) => {
        e.stopPropagation();
        openEditNoteModal(li);
    });

    const deleteIcon = document.createElement('span');
    deleteIcon.className = 'delete';
    deleteIcon.innerHTML = '🗑️'; // Ícone de lixeira
    deleteIcon.addEventListener('click', (e) => {
        e.stopPropagation();
        li.remove();
    });

    actionsDiv.appendChild(editIcon);
    actionsDiv.appendChild(deleteIcon);
    li.appendChild(actionsDiv);

    document.querySelector('.notes-list').appendChild(li);
}

// Função para abrir o modal de edição de anotação
function openEditNoteModal(noteItem) {
    const editNoteModal = document.getElementById('editNoteModal');
    const editNoteInput = document.getElementById('editNoteInput');
    const saveEditNoteButton = document.getElementById('saveEditNoteButton');

    editNoteInput.value = noteItem.firstChild.textContent;
    editNoteModal.style.display = 'block';

    saveEditNoteButton.onclick = () => {
        const newNoteContent = editNoteInput.value.trim();
        if (newNoteContent && newNoteContent.length <= 255) {
            noteItem.firstChild.textContent = newNoteContent;
            editNoteModal.style.display = 'none';
        }
    };
}

// Fechar o modal de edição de anotação
document.getElementById('closeEditNoteModal').onclick = () => {
    document.getElementById('editNoteModal').style.display = 'none';
};

// Limitar a entrada de caracteres no campo de edição
document.getElementById('editNoteInput').addEventListener('input', (e) => {
    if (e.target.value.length > 255) {
        e.target.value = e.target.value.slice(0, 255);
    }
});
