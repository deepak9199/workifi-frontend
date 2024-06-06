import { Component, ElementRef, NgZone } from '@angular/core';
import { Conversation, Conversation_detail, Message } from '../../model/message.';
import { CollectionService } from '../../shared/_service/collection.service';
import { TokenStorageService } from '../../shared/_service/token-storage.service';
import { ToastrService } from 'ngx-toastr';
import { users_detail } from '../../model/user';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css'
})
export class MessagesComponent {
  loading: boolean = false
  conversation: Conversation_detail[] = []
  selectedCustomerIndex: number = 0
  phone_list: Conversation[] = []
  phone_list_msg: Conversation[] = []
  Globle_phone_list_msg: Conversation[] = []
  currentChatMessages: Message[] = []
  messageData: string = ''
  msg_index: number = 0;
  searchQueryString: string = ''
  role: string = ''
  userlist: users_detail[] = []
  constructor(
    private collectionService: CollectionService,
    private token: TokenStorageService,
    private elementRef: ElementRef,
    private ngZone: NgZone, // Added NgZone
    private toster: ToastrService, // Added NgZone
  ) { }
  ngOnInit() {
    this.role = this.token.getUser().role
    this.getuser()
  }
  // Method to select a different customer
  selectCustomer(index: number) {
    this.selectedCustomerIndex = index;
    this.currentChatMessages = this.conversation[this.selectedCustomerIndex].messages
    // console.log(this.isWithinLast24Hours(new Date(this.phone_list_msg[this.msg_index].lastmessagedatetime)))
    setTimeout(() => {
      this.scrollToTop();
    }, 100);
  }
  deleteconversation(data: Conversation_detail) {
    this.deleteconverstaionapi(data)
  }
  private scrollToTop(): void {
    try {
      const msgHistory = this.elementRef.nativeElement.querySelector('.inbox_chatting_box');
      // msgHistory.scrollTop = 0; // Set scrollTop to 0 to scroll to the top
      msgHistory.scrollTop = msgHistory.scrollHeight; // Set scrollTop to 0 to scroll to the top
    } catch (err) {
      console.error('Error scrolling to top:', err);
    }
  }
  private addconverstaionapi(data: Conversation) {
    this.collectionService.addDocumnet('conversation', data).subscribe({
      next: data => {
        console.log('Conversation is added successfuly')
      },
      error: err => {
        console.error(err.message)
      }
    })
  }
  private getconverstaionapi() {
    this.loading = true
    this.collectionService.getData('conversation').subscribe({
      next: (data: Conversation_detail[]) => {

        const user = this.token.getUser();
        if (user && user.role && user.uid) {
          this.conversation = data.filter((item: Conversation_detail) =>
            user.role === 'freelancer' ? item.cid === user.uid : item.uid === user.uid
          );

          this.loading = false;

          if (this.conversation.length !== 0) {
            this.selectCustomer(0);
          } else {
            console.error('no conversation found');
          }
        } else {
          this.loading = false;
          console.error('User, role, or UID is null');
        }

      },
      error: err => {
        console.error(err.message)
        this.loading = false
      }
    })
  }
  private deleteconverstaionapi(data: Conversation_detail) {
    this.loading = true
    this.collectionService.deleteDocument('conversation', data.id,).subscribe({
      next: (data) => {
        console.log('Conversation is Deleted successfuly')
        this.loading = false
      },
      error: err => {
        console.error(err.message)
        this.loading = false
      }
    })

  }
  private updateconverstaionapi(data: Conversation_detail) {
    this.collectionService.updateDocument('conversation', data.id, data).subscribe({
      next: (data) => {
        console.log('Conversation is updated successfuly')
      },
      error: err => {
        console.error(err.message)
      }
    })

  }
  dateTimeToUnix(date: Date): number {
    return Math.floor(date.getTime() / 1000); // Convert milliseconds to seconds
  }
  sendmessage(msg: string, conversationIndex: number) {
    if (this.role != 'freelancer') {
      if (this.messageData != '') {
        this.conversation[conversationIndex].lastmessagedatetime = new Date().toString()
        this.conversation[conversationIndex].messages.push({
          type: 'outgoing',
          text: msg,
          time: this.formatTime(new Date()),
          date: this.formatDate(new Date())
        })
        // console.log(this.conversation[conversationIndex])
        this.messageData = ''
        setTimeout(() => {
          this.scrollToTop();
          this.updateconverstaionapi(this.conversation[conversationIndex])
        }, 100);
      }
      else {
        this.toster.error('Please type your message')
      }
    }
    else {
      if (this.messageData != '') {
        this.conversation[conversationIndex].lastmessagedatetime = new Date().toString()
        this.conversation[conversationIndex].messages.push({
          type: 'incoming',
          text: msg,
          time: this.formatTime(new Date()),
          date: this.formatDate(new Date())
        })
        // console.log(this.conversation[conversationIndex])
        this.messageData = ''
        setTimeout(() => {
          this.scrollToTop();
          this.updateconverstaionapi(this.conversation[conversationIndex])
        }, 100);
      }
      else {
        this.toster.error('Please type your message')
      }
    }


  }
  getname(id: string, list: users_detail[]) {
    let result = {
      name: '',
      phone: ''
    }
    let finddata: users_detail[] = list.filter((obj: users_detail) => obj.uid === id)
    if (finddata.length != 0) {
      result.name = finddata[0].name
      result.phone = finddata[0].contact
    }
    else {
      console.error('user not found')
    }
    return result
  }
  private formatDate(date: Date): string {
    // Format the date as "YYYY-MM-DD" (required by input type="date")
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 because getMonth() returns zero-based month
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  private formatTime(date: Date): string {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    return formattedHours + ':' + (minutes < 10 ? '0' : '') + minutes + ' ' + ampm;
  }
  private unixToDateTime(unixTimestamp: number): Date {
    return new Date(unixTimestamp * 1000); // JavaScript Date constructor expects milliseconds
  }
  sortByDateDescending(array: Message[]): any[] {
    return array.sort((a, b) => {
      const dateA = new Date(`${a.date} ${a.time}`);
      const dateB = new Date(`${b.date} ${b.time}`);
      return dateA.getTime() - dateB.getTime();
    });
  }
  sortByDateDescendingconver(array: Conversation[]): any[] {
    return array.sort((a, b) => {
      const dateA = new Date(a.lastmessagedatetime);
      const dateB = new Date(b.lastmessagedatetime);
      // console.log(dateA, dateB)
      return dateB.getTime() - dateA.getTime();
    });
  }
  // Method to filter items based on search query
  filterItems() {
    if (!this.searchQueryString.trim()) {
      // If search query is empty, show all items
      this.phone_list_msg = this.Globle_phone_list_msg;
      return;
    }
    // console.log(this.filteredItems)
    this.phone_list_msg = this.Globle_phone_list_msg.filter(item => {
      for (const key in item) {
        if (Object.prototype.hasOwnProperty.call(item, key)) {
          const value = item[key as keyof Conversation]; // Asserting key as keyof Item
          if (typeof value === 'string' && value.toLowerCase().includes(this.searchQueryString.toLowerCase())) {
            return true;
          }
        }
      }
      return false;
    });
    // console.log(this.filteredItems)
  }
  selectmsg(data: string) {
    this.messageData = data
  }
  isWithinLast24Hours(inputDate: string): boolean {
    const currentTime = new Date();
    const timeDifference = currentTime.getTime() - new Date(inputDate).getTime();
    const twentyFourHoursInMilliseconds = 24 * 60 * 60 * 1000;
    return timeDifference <= twentyFourHoursInMilliseconds;
  }
  // Function to count unseen messages in a conversation
  countUnseenMessages(conversation: Conversation): number {
    // Logic to determine what constitutes an unseen message goes here
    // For this example, we will assume that all incoming messages are unseen

    let unseenCount = 0;

    // Iterate over the messages to count unseen ones
    for (const message of conversation.messages) {
      if (message.type === 'incoming') {
        unseenCount++;
      }
    }

    return unseenCount;
  }
  private getuser() {
    this.loading = true
    this.collectionService.getData('users').subscribe({
      next: (data: users_detail[]) => {
        // console.log(data)
        this.userlist = data
        this.getconverstaionapi()
      },
      error: err => {
        console.error(err)
        this.loading = false
      }
    })
  }
  formatTimeconv(date: string): string {
    const hours = new Date(date).getHours();
    const minutes = new Date(date).getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    return formattedHours + ':' + (minutes < 10 ? '0' : '') + minutes + ' ' + ampm;
  }
  formatDateconv(date: string): string {
    // Format the date as "YYYY-MM-DD" (required by input type="date")
    const year = new Date(date).getFullYear();
    const month = (new Date(date).getMonth() + 1).toString().padStart(2, '0'); // Adding 1 because getMonth() returns zero-based month
    const day = new Date(date).getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
